import React, { useEffect, useState } from 'react';

import Layout from '../../layout/main';
import { getAllblogs } from '../../api/blogs';
import AddIcon from '../../global/images/plus.png';

import { Card } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

import { StyledAddBtn, StyledBlog, StyledContainer } from './styled';
import { useNavigate } from 'react-router-dom';

function ManageBlogs() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllblogs().then((response) => {
      setData(response);
    });
  }, []);

  const routes = [
    {
      title: 'Manage Blogs',
    },
  ];

  return (
    <Layout isSpinning={!data.length} routes={routes}>
      <StyledContainer>
        <StyledAddBtn onClick={() => navigate('/manage-blogs/add-blog')}>
          <img src={AddIcon} alt="" />
          <p>Add Movie</p>
        </StyledAddBtn>
        {data.map(({ title, author, bannerImage, _id }) => {
          return (
            <StyledBlog
              cover={<img src={bannerImage} style={{ height: 150 }} />}
              actions={[
                <EditTwoTone
                  onClick={() => navigate(`/manage-blogs/edit/${_id}`)}
                />,
                <DeleteTwoTone twoToneColor="#eb2f96" />,
              ]}
            >
              <Card.Meta title={title} description={`Created By: ${author}`} />
            </StyledBlog>
          );
        })}
      </StyledContainer>
    </Layout>
  );
}

export default ManageBlogs;
