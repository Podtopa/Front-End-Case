import React, {useState} from "react";
import {useCourses} from "../../hooks/use-courses";
import {Layout, Card, Col, Row, Image, Pagination, Rate, Tag } from 'antd';
import {CardItem} from "./CardItem";
const {Header, Content, Footer} = Layout;

const PAGE_SIZE = 10;

export function AllCoursesPage() {
  const courses = useCourses();
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
        <Row gutter={16} style={{
          padding: '48px 0',
        }}>
          {courses.map((course, index) =>
            index >= pagination.minIndex &&
            index < pagination.maxIndex && (
              <CardItem key={course.id} course={course}/>
            )
          )}
        </Row>
      </Content>
      <Pagination
        pageSize={PAGE_SIZE}
        current={pagination.current}
        total={courses.length}
        onChange={handleChange}
        style={{ bottom: "0px" }}
      />
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


