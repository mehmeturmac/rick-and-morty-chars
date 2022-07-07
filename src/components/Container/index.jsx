import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARS } from './queries';
import { Col, Row, Card, Pagination, Button, Divider, Radio, Space } from 'antd';

function Container() {
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [filtered, setFiltered] = useState(true);

  const { loading, data } = useQuery(GET_CHARS, {
    variables: {
      page,
      gender,
      species,
    },
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const onChangePage = (page) => {
    setPage(page);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
    setFiltered(false);
  };

  const onChangeSpecies = (e) => {
    setSpecies(e.target.value);
    setFiltered(false);
  };

  const clearFilters = () => {
    setPage(1);
    setGender('');
    setSpecies('');
    setFiltered(true);
  };

  return (
    <div>
      <Row justify="center">
        <Col lg={3} md={0} sm={0} xs={0}>
          <Row justify="space-between">
            <h1>Filters</h1>
            <Button disabled={filtered} type="text" size="small" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Row>
          <Divider />
          <h4>GENDER</h4>
          <Radio.Group onChange={onChangeGender} value={gender}>
            <Space direction="vertical">
              <Radio value={'Male'}>Male</Radio>
              <Radio value={'Female'}>Female</Radio>
              <Radio value={'Genderless'}>Genderless</Radio>
              <Radio value={'unknown'}>unknown</Radio>
            </Space>
          </Radio.Group>
          <Divider />
          <h4>SPECIES</h4>
          <Radio.Group onChange={onChangeSpecies} value={species}>
            <Space direction="vertical">
              <Radio value={'Human'}>Human</Radio>
              <Radio value={'Alien'}>Alien</Radio>
              <Radio value={'Humanoid'}>Humanoid</Radio>
              <Radio value={'Animal'}>Animal</Radio>
              <Radio value={'Robot'}>Robot</Radio>
              <Radio value={'Cronenberg'}>Cronenberg</Radio>
              <Radio value={'Mytholog'}>Mytholog</Radio>
              <Radio value={'Disease'}>Disease</Radio>
              <Radio value={'Poppybutthole'}>Poppybutthole</Radio>
              <Radio value={'unknown'}>unknown</Radio>
            </Space>
          </Radio.Group>
        </Col>
        <Col span={12} offset={1} flex>
          <Row gutter={[16, 16]} align="middle" justify="center">
            {data.characters.results.map((character) => (
              <Col sm={24} md={12} xl={8} xxl={6} key={character.id}>
                <Card size="small" style={{ width: 170, height: 300 }} bordered={false} cover={<img alt="example" src={character.image} />}>
                  <p className="card-species">{character.species}</p>
                  <h1 className="card-name">{character.name}</h1>
                  <p className="card-location">{character.location.name}</p>
                </Card>
              </Col>
            ))}
            <Col span={24}>
              <Row justify="center">
                <Pagination showSizeChanger={false} defaultCurrent={1} current={page} onChange={onChangePage} total={data.characters.info.count} />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Container;
