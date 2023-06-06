import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users';


const Login = () => {
  const [type, setType] = useState("Donar");
  const navigate = useNavigate()
  const onFinish = async (values) => {
    // console.log(values);
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        //put the token in the response data so we can know its this or that user 
        localStorage.setItem("token", response.data);
        navigate('/')
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      return message.error(error.message)
    }
  }
  useEffect(() => { //if we have a token in the local storage aka logged in then we dont need to show the login page
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])
  
  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
       <Form
            layout='vertical'
        className="bg-white rounded shadow grid p-5 gap-5 w-1/3"
        onFinish={onFinish}
        >
            <h1 className="uppercase text-2xl">
                  <span className="text-primary">
                    {type.toUpperCase()} - LOGIN
                  </span>
                  <hr />
            </h1>
            
            <Radio.Group onChange={(e) => setType(e.target.value)} 
              value={type}
              className=''
            >
              <Radio value="donar">Donar</Radio>
              <Radio value="hospital">Hospital</Radio>
              <Radio value="organization">Organization</Radio>
            </Radio.Group>
          
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password"/>
            </Form.Item>
      
            <Button type='primary' block className='' htmlType="submit">
                Login
            </Button>
            
            <Link to='/register' className=' text-center'>
                Don't have an account ? Register
            </Link>
       </Form>
    </div>
  )
}

export default Login