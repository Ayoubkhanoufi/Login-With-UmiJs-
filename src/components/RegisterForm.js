import { Form, Input, InputNumber, Button, Col, Row, Card,  } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router';

const onFinish = values => {
  console.log(values);
};
class RegisterForm extends React.Component{
  
  state = {
    redirection: false 
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post(`http://localhost:4000/api/users/register`, values)
          .then(() => this.setState({ redirection: true }))
          .catch(function (erreur) {
            console.log(erreur);
          });
      }
    });
  };

  comparePassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords doesn\'t match');
    } else {
      callback();
    }
  };

  render(){
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: 'This field is required!',
      types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
      },
      number: {
        range: 'Must be between ${min} and ${max}',
      },
    };

    const { redirection } = this.state;
    const { getFieldDecorator } = this.props.form;

    if (redirection) {
      //Go to rediraction
      return <Redirect to='/'/>;
    }
  return (

    <div style={{ background: '', padding: '30px' }}>
    <Card title="Registration" bordered={false} >

      <Row align="middle" style={{paddingLeft :100,paddingBottom :300, minHeight: '100vh'}}>
        <Col span={18}>
          <Form {...layout} name="nest-messages" onSubmit={this.handleSubmit} onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
              label="Username">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Your user name', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input />)}
            </Form.Item>

            
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            
            
            <Form.Item label="Confirm password" hasFeedback>
              {getFieldDecorator('passwordConfirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.comparePassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
    </div>
  );
  }
};

export default Form.create()(RegisterForm);
