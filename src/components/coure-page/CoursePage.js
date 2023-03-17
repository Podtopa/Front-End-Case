import React from "react";
import {useCourse} from "../../hooks/use-course";
import {Layout, Card, Col, Row, Image, Space, Button} from 'antd';
import { useParams } from 'react-router-dom';

const {Header, Content, Footer} = Layout;

export function CoursePage() {
  const {id} = useParams();
  const course = useCourse(id);

  const isDisabled = ({status}) => status === "locked";

  return(
    <Layout>
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
            <Col span={8} style={{
              padding: 16,
            }}>
              <Card
                title={course.lessons[0].title}
                style={{width: '70vw'}}
                cover={<img alt="course" src={`${course.lessons[0].previewImageLink}/lesson-${course.lessons[0].order}.webp`}/>} //to do change on video
              >
                <Row align={"middle"}>
                  <Col flex={1}>Duration: {course.lessons[0].duration}</Col>
                </Row>
              </Card>
            </Col>
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
                    textAlign: 'center',
                    background: isDisabled(lesson) ? 'lightgray' : 'white'
                  }}
                  hoverable={!isDisabled(lesson)}
                >
                  <Image
                    alt={lesson.title}
                    src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
                    preview={false}
                  />
                  {lesson.title}
                </Card.Grid>
              ))}
            </Card>
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