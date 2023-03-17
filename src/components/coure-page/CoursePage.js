import React from "react";
import {Link} from "react-router-dom";
import {useCourse} from "../../hooks/use-course";
import {Layout, Card, Col, Row, Image, Space, Button} from 'antd';
import { useParams } from 'react-router-dom';

const {Header, Content, Footer} = Layout;

export function CoursePage() {
  const {id, lessonId} = useParams();
  const course = useCourse(id);
  const currentLesson = course?.lessons?.find(({id}) => id === lessonId) ?? course?.lessons?.find(({status}) => status === 'unlocked');

  const isActive = ({id}) => currentLesson.id === id;
  const isDisabled = ({status}) => status === "locked";

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
        <Space wrap style={{
          padding: 16,
          paddingBottom: 0,
        }}>
          <Button type="text" href="/">Home</Button>
        </Space>
        {!!course && (
          <>
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
                  cover={<img alt="course" src={`${currentLesson.previewImageLink}/lesson-${currentLesson.order}.webp`}/>} //to do change on video
                >
                  <Row align={"middle"}>
                    <Col flex={1}>Duration: {currentLesson.duration}</Col>
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