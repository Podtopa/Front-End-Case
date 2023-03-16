import React from "react";
import {useCourses} from "../../hooks/use-courses";
import {Layout, Card, Col, Row} from 'antd';
const {Header, Content, Footer} = Layout;

export function AllCoursesPage() {
  const courses = useCourses();
  console.log(courses);

  return (
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

      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <Row gutter={16} style={{
          padding: '48px 0',
        }}>
          {courses.map(course => (
            <Col span={8} style={{
              padding: 16,
            }}>
              <Card title={course.title} bordered={false}>
                Card content
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Anastasiia Podtopa ©2023
      </Footer>
    </Layout>
  );
}


