import { Form, Input, Button, Checkbox, Row, Col, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Redirect } from 'react-router';
const { Title } = Typography;

const onFinish = values => {
  console.log('Received values of form: ', values);
};
class LoginForm extends React.Component {

  state = {
    redirection: false 
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post(`http://localhost:4000/api/users/login`, { email: values.email, password: values.password })
          .then(res =>{this.setState({ redirection: true })
              const token = res.data.token;
              localStorage.setItem('userToken', token);
          })
          .catch(error => {
            this.setState({
                errors : " Wrong email or password."
              });
          });     
      }else{
        message.warning('You need to login first');
      }
    });
  };

  render(){
    const { redirection } = this.state;
    const { getFieldDecorator } = this.props.form;

    if (redirection) {
      //Go to rediraction
      return <Redirect to='/laptops'/>;
    }
    return (


      <div style={{ background: '', padding: '30px' }}>
      <Card title="Login" bordered={true} >
        <Row align="middle" style={{paddingLeft :470,paddingBottom :300, minHeight: '100vh'}}>
        <Col span={12}>
          <Title align="middle" >Log In</Title>
          <Form onSubmit={this.handleSubmit} name="normal_login" className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your Email!' }],
              })(
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"/>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' },
                {
                  validator: this.validateToNextPassword,
                },
              ],
              })(
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"        
                />,
              )}
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
                <a style={{paddingLeft :230}} className="login-form-forgot" href="">
                 Forgot password
                </a>
              </Form.Item>
            <Form.Item>
              <Button style={{width: 470 }} type="primary" htmlType="submit">
                Log in
              </Button>
              Or <a  href="/register">Register now!</a>
            </Form.Item>
          </Form>
        </Col>
        </Row>
      </Card>
      </div>
    );
  } 
};

export default Form.create()(LoginForm);