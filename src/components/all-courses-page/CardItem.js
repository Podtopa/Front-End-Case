import React from "react";
import { Card, Col, Row, Rate, Tag } from 'antd';

export function CardItem({course}) {
  return (
    <Col span={8} style={{
      padding: 16,
    }}>
      <Card title={course.title}
            bordered={false}
            cover={<img alt="course" src={`${course.previewImageLink}/cover.webp`} />}
      >
        <Row align={"middle"}>
          <Col flex={1}>Duration: {course.duration}</Col>
          <Col flex={1}><Rate disabled defaultValue={course.rating}/></Col>
        </Row>
        {!!course.meta?.skills?.length && (
          <Row>
            <Col flex={1}>
              {course.meta?.skills?.map(skill => (
                <Tag color="blue" style={{
                  margin: 4,
                }}>
                  {skill}
                </Tag>
              ))}
            </Col>
          </Row>
        )}
      </Card>
    </Col>
  );
}
