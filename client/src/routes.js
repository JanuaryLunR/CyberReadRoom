import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {LibPage} from './pages/LibPage'
import {MainLibPage} from './pages/MainLibPage'
import {BookPage} from './pages/BookPage'
import {AuthPage} from './pages/AuthPage'
import {CreateBook} from './pages/CreateBook'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/LibPage" element={<LibPage />} exact />          
        <Route path="/MainLibPage" element={<MainLibPage />} exact />
        <Route path="/BookPage/:id" element={<BookPage />}/>  
        <Route path="/CreateBook" element={<CreateBook />} />
        <Route path="/auth" element={<Navigate replace to="/MainLibPage" />} />    
        <Route path="/" element={<Navigate replace to="/MainLibPage" />} />
      </Routes>
    )
    
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<AuthPage />} />
    </Routes>
  )
  // <Navigate to="/"/>
  // авторизация через мидлвейр
  // Респонс проверяет с сервера есть ли ошибки
  // Попап вылезает сверху справа если ошибка
}