import { Form, Input } from 'antd';

const { Search } = Input;

function Header() {
  return (
    <div className="header">
      <p className="header-title">Wubba Lubba Dub Dub.</p>
      <Form className="header-form">
        <Search
          className="search"
          placeholder="Name, description, location …"
          allowClear
          size="large"
          // onSearch={onSearch}
        />
      </Form>
    </div>
  );
}

export default Header;
