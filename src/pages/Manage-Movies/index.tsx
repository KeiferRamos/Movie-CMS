import CustomTable from '../../components/table';
import Layout from '../../layout/main';
import { Link } from 'react-router-dom';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
];

const columns = [];

function ManageMovies() {
  const onSearch = (value) => {
    console.log(value);
  };
  return (
    <Layout
      isSpinning={!dataSource.length}
      routes={[
        {
          title: <Link to="/manage-movies">Manage Movies</Link>,
        },
      ]}
    >
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        onSearch={onSearch}
      />
    </Layout>
  );
}

export default ManageMovies;
