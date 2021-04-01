import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Table, Form, Button } from 'react-bootstrap'

function App() {
  const [visitingList, setVisitingList] = useState([])
  const [name, setName] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!name) {
      alert('방문자명을 입력하세요.')
      return
    }
    const { data } = await axios.post('/visit', { name })
    setVisitingList([...visitingList, data])
    setName('')
  }

  useEffect(() => {
    const saveData = async () => {
      const { data } = await axios.get('/visit')
      setVisitingList(data)
    }
    saveData()
  }, [])

  return (
    <div className='App' style={{ margin: '30px' }}>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>방문자</Form.Label>
            <Form.Control
              type='text'
              placeholder='방문자 명을 입력하세요'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Text className='text-muted'></Form.Text>
          </Form.Group>
          <Button variant='primary' type='submit' style={{ margin: '10px' }}>
            Submit
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>이름</th>
              <th>방문시간</th>
            </tr>
          </thead>
          <tbody>
            {visitingList.length === 0 ? (
              <tr style={{ textAlign: 'center' }}>
                <td colSpan='3'>목록이 없습니다</td>
              </tr>
            ) : (
              visitingList.map(({ name, createdAt }, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default App
