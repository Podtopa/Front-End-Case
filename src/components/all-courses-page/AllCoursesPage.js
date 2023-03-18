import React, {useState} from "react";
import {useCourses} from "../../hooks/useCourses";
import {Layout, Row, Col, Pagination, Spin, Alert} from 'antd';
import {CardItem} from "./CardItem";

const {Header, Content, Footer} = Layout;

const PAGE_SIZE = 10;

export function AllCoursesPage() {
  const [courses, isLoading, error] = useCourses();
  const [pagination, setPagination] = useState({
    current: 1,
    minIndex: 0,
    maxIndex: PAGE_SIZE,
  });

  const handleChange = (page) => {
    setPagination({
      current: page,
      minIndex: (page - 1) * PAGE_SIZE,
      maxIndex: page * PAGE_SIZE
    });
  };

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

        {!isLoading && !!courses?.length && (
          <>
            <Row
              gutter={16}
              justify="center"
              style={{
                padding: '48px 0',
              }}
            >
              {courses.map((course, index) =>
                  index >= pagination.minIndex &&
                  index < pagination.maxIndex && (
                    <CardItem key={course.id} course={course}/>
                  )
              )}
            </Row>
            <Row justify="center">
              <Col>
                <Pagination
                  pageSize={PAGE_SIZE}
                  current={pagination.current}
                  total={courses.length}
                  onChange={handleChange}
                  style={{ bottom: "0px" }}
                />
              </Col>
            </Row>
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
  );
}


