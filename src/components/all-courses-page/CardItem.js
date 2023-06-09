import React from "react";
import {Link} from "react-router-dom";
import {Card, Col, Row, Rate, Tag} from 'antd';
import {getDuration} from "../../utils";

export function CardItem({course}) {
  return (
    <Col span={8} style={{
      padding: 16,
      minWidth: '320px',
    }}>
      <Link to={`/course/${course.id}`}>
        <Card
          title={course.title}
          bordered={false}
          cover={<img alt="course" src={`${course.previewImageLink}/cover.webp`} />}
          style={{
            height: '465px',
          }}
        >
          <Row align={"middle"}>
            <Col flex={1}>Duration: {getDuration(course.duration)}</Col>
            <Col flex={1}><Rate disabled defaultValue={course.rating}/></Col>
          </Row>
          {!!course.meta?.skills?.length && (
            <Row>
              <Col flex={1}>
                {course.meta?.skills?.map(skill => (
                  <Tag key={skill} color="blue" style={{
                    margin: 4,
                  }}>
                    {skill}
                  </Tag>
                ))}
              </Col>
            </Row>
          )}
        </Card>
      </Link>
    </Col>
  );
}
