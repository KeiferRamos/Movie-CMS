import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Row, Col, Drawer, Select, Button, message } from 'antd';
import {
  ValidationSchema,
  columns,
  initialValues,
  permissions,
} from './constant';
import { Form as CreateForm, SubmitButton } from 'formik-antd';
import CustomInput from '../../components/input';
import { useParams } from 'react-router-dom';
import Layout from '../../layout/main';
import { editUser, getUser } from '../../api/users';
import { Profile, StyledSelect } from './style';
import Upload from '../../components/upload';
import CustomTable from '../../components/table';

function Form() {
  const { id }: any = useParams();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(initialValues);

  useEffect(() => {
    getUser(id).then((data: any) => {
      setUser(Object.assign(initialValues, data));
      setIsLoading(false);
    });
  }, []);

  const submitForm = async (values) => {
    try {
      const data = await editUser(values, id);
      setUser(data);
      setOpen(false);
      message.success('user updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const { Option } = Select;

  return (
    <Layout
      isSpinning={isLoading}
      routes={[
        {
          title: <Link to="/manage-users">Manage User</Link>,
        },
        id && {
          title: `${user.firstName} ${user.lastName}`,
        },
        {
          title: <p>{id ? 'Edit' : 'Add'}</p>,
        },
      ]}
    >
      <Drawer title="Edit User" placement="right" onClose={onClose} open={open}>
        <Formik
          initialValues={user}
          onSubmit={submitForm}
          validationSchema={ValidationSchema}
        >
          {({ setFieldValue, values, isValid, dirty }) => {
            console.log(dirty, isValid);
            return (
              <CreateForm>
                <Upload
                  style={{
                    height: 300,
                  }}
                  value={values.image}
                  onchange={(image) => {
                    setFieldValue('image', image);
                  }}
                />
                <CustomInput
                  name="firstName"
                  span={24}
                  placeholder="First name"
                />
                <CustomInput
                  name="lastName"
                  span={24}
                  placeholder="Last name"
                />
                <CustomInput
                  name="contactNumber"
                  span={24}
                  placeholder="Contact Number"
                />
                <CustomInput name="email" span={24} placeholder="email" />
                <StyledSelect>
                  <h3>User Permissions</h3>
                  <Select
                    mode="multiple"
                    style={{
                      width: '100%',
                      marginBottom: '1em',
                    }}
                    value={values.permissions}
                    placeholder="select user permissions"
                    onChange={(value) => {
                      setFieldValue('permissions', value);
                    }}
                    optionLabelProp="label"
                  >
                    {permissions.map((value) => {
                      return (
                        <Option value={value}>
                          {value.split(':').join(' ')}
                        </Option>
                      );
                    })}
                  </Select>
                </StyledSelect>
                <SubmitButton>Update</SubmitButton>
              </CreateForm>
            );
          }}
        </Formik>
      </Drawer>
      <Row gutter={20}>
        <Col span={8}>
          <Profile>
            {user.image ? (
              <img src={user.image} alt="" />
            ) : (
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                alt=""
              />
            )}

            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <span>
              <b>{user.role === 'admin' ? 'Administrator' : 'Developer'}</b>
            </span>
            <div>
              <p>Email: {user.email}</p>
              <br />
              <p>Contact Number: {user.contactNumber}</p>
            </div>
            <Button type="primary" onClick={showDrawer}>
              Update Profile
            </Button>
          </Profile>
        </Col>
        <Col span={16}>
          <CustomTable dataSource={user.activities} columns={columns} />
        </Col>
      </Row>
    </Layout>
  );
}

export default Form;
