import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const {loading, request} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      console.log(data)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
              <div className="row">
                <div className="input-field col s6">
                  <input 
                    placeholder="Type your email" 
                    id="email"
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

                <div className="row">
                  <div className="input-field col s6">
                    <input 
                      placeholder="Type your password" 
                      id="password"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={changeHandler}
                    />
                    <label htmlFor="email">Password</label>
                  </div>
                </div>

          </div>
          <div className="card-action" style={{margin: 0}}>
            <button className="btn yellow darken-4" disabled={loading} onClick={loginHandler}>Login</button>
            <button className="btn grey lighten-1 blacktext" onClick={registerHandler} disabled={loading}>Registration</button>
          </div>
        </div>
      </div>
    </div>
  )
}