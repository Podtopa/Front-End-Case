import React, {useRef, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Layout, Card, Col, Row, Image, Space, Button, Spin, Alert} from 'antd';
import Hls from "hls.js";
import {useCourse} from "../../hooks/useCourse";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {getDuration} from "../../utils";

const {Header, Content, Footer} = Layout;

export function CoursePage() {
  const {id, lessonId} = useParams();
  const [course, isLoading, error] = useCourse(id);

  const videoRef = useRef();
  const [playerStatus, setPlayerStatus] = useState('loading');
  const [videoState, setVideoState] = useLocalStorage('video-player-state');

  const currentLesson = course?.lessons?.find(({id}) => id === lessonId)
    ?? course?.lessons?.find(({status}) => status === 'unlocked');

  const videoStateById = currentLesson?.id && videoState?.[currentLesson?.id] ? Number(videoState?.[currentLesson?.id]) : 0;
  const setVideoStateById = (value) => setVideoState({
    ...(videoState || {}),
    [currentLesson?.id]: value,
  })

  const isActive = ({id}) => currentLesson.id === id;
  const isDisabled = ({status}) => status === "locked";

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls({
        debug: true,
      });
      hls.loadSource(currentLesson.link);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // added setTimeout to avoid error with video player buffering
        setTimeout(() => {
          if (videoRef.current && videoStateById) {
            videoRef.current.currentTime = videoStateById;
          }

          videoRef.current.play();
          setPlayerStatus('playing');
        }, 1500)
      });

      hls.on(Hls.Events.ERROR, (event, error) => {
        if (error?.type === "networkError") {
          setPlayerStatus('error');
        }
      });

      return () => {
        if (!!videoRef.current?.currentTime) {
          setVideoStateById(videoRef.current?.currentTime);
        }

        hls.destroy();
      }
    }
  },[videoRef, currentLesson])

  const LessonLink = ({ lesson, children }) => (
    isDisabled(lesson)
      ? <>{children}</>
      : <Link to={`/course/${course.id}/lesson/${lesson.id}`}>{children}</Link>
  );

  const getBackground = (lesson) => {
    if (isActive(lesson)) {
      return 'lightblue';
    }

    return isDisabled(lesson) ? 'lightgray' : 'white';
  }

  return(
    <Layout style={{
      minHeight: '100vh',
    }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          color: 'white',
        }}
      > Front-End Case
      </Header>

      <Content>
        {isLoading && (
          <Spin
            size="large"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%'
            }}
          />
        )}

        {error && (
          <Alert
            message="Oops! Something Went Wrong"
            description={error}
            type="error"
            style={{
              padding: 18,
              margin: 18,
            }}
          />
        )}

        {!isLoading && course && (
          <>
            <Space wrap style={{
              padding: 16,
              paddingBottom: 0,
            }}>
              <Button type="text" href="/">← Home</Button>
            </Space>

            <Row
              justify="center"
              style={{
                padding: 16,
              }}
            >
              <Col>
                <Card
                  title={currentLesson.title}
                  style={{width: '70vw'}}
                  cover={
                    <>
                      {(playerStatus === 'loading' || playerStatus === 'playing') && (
                        <video controls ref={videoRef} />
                      )}

                      {playerStatus === 'error' && (
                        <>
                          <img
                            alt={currentLesson.title}
                            src={`${currentLesson.previewImageLink}/lesson-${currentLesson.order}.webp`}
                          />
                          <Alert
                            message="No data found for resource with given identifier"
                            type="error"
                            style={{
                              position: 'absolute',
                              bottom: '72px',
                              width: 'calc(100% - 32px)',
                              margin: '16px'
                            }}
                          />
                        </>
                      )}
                    </>
                  }
                >
                  <Row align={"middle"}>
                    <Col flex={1}>Duration: {getDuration(currentLesson.duration)}</Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Col style={{
              padding: 16,
            }}>
              <Card
                title="Lessons"
                style={{
                  textAlign: 'center',
                }}
              >
                {course?.lessons?.map(lesson => (
                  <Card.Grid
                    key={lesson.id}
                    style={{
                      width: '25%',
                      minWidth: '320px',
                      margin: 'auto',
                      textAlign: 'center',
                      background: getBackground(lesson),
                    }}
                    hoverable={!isDisabled(lesson)}
                  >
                    <LessonLink lesson={lesson}>
                      <Image
                        alt={lesson.title}
                        src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
                        preview={false}
                      />
                      {lesson.title}
                    </LessonLink>
                  </Card.Grid>
                ))}
              </Card>
            </Col>
          </>
        )}
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Anastasiia Podtopa ©2023
      </Footer>
    </Layout>
  )
}