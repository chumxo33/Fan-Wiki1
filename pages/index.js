import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';   // useState: cập nhật trạng thái đó với nhiều kết quả
import Link from 'next/link'

const defaultEndpoint ='https://rickandmortyapi.com/api/character/';

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)  // Fetches: API cho việc gửi và nhận request bằng js
  const data = await res.json(); // json: Lấy hoặc lưu giữ định dạng json
  return {
    props: {
      data
    }
    //props: truyền dữ liệu vào data
  }
}
export default function Home({ data }) { 
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);
  const [page, updatePage] = useState({  //page: trạng thái mới  mà chúng ta có thể sử dụng để nhận được các giá trị prev+next
                                          // ("prev + next"): giúp chọn được thành phần kế tiếp ngay sau thành phần trước.
  ...info,
    current: defaultEndpoint             // tạo một giá trị mới cho defaultEndpoint  
  });


  const { current } = page;               // cấu trúc lại giá trị từ trang

    useEffect(() => {                      // Tạo useEffect hook : Nó thay đổi giá trị, hook sẽ chạy
    if ( current === defaultEndpoint ) return;
  
    async function request() {              // async/await : Hàm khai báo
      const res = await fetch(current)      // current: điểm cuối
      const nextData = await res.json();
  
      updatePage({
        current,
        ...nextData.info
      });
      updateResults(prev => {
        return [
          ...prev,
          ...nextData.results
        ]
      });
    }
    request();
  }, [current]);


  function handleLoadMore() {
    updatePage(prev => {          // Chức năng sẽ cập nhật Page trạng thái của current giá trị mới, cụ thể next giá trị nạp kết quả tiếp theo
      return {
        ...prev,
        current: page?.next
      }
    });
  }

  function handleOnSubmitSearch(e) {
    e.preventDefault();
  
    const { currentTarget = {} } = e;  //trả về phần tử có trình xử lý đã kích hoạt
    const fields = Array.from(currentTarget?.elements);  //Array: Mảng
    const fieldQuery = fields.find(field => field.name === 'query');   // Lấy field cho đầu vào truy vấn
  
    const value = fieldQuery.value || '';  // Lấy giá trị của đầu vào
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;  // Tạo một điểm cuối mới
  
    updatePage({
      current: endpoint //kích hoạt yêu cầu mới tới điểm cuối đó
    });
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Wubba Lubba Dub Dub!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Wubba Lubba Dub Dub!
        </h1>

        <p className={styles.description}>
          Rick và Morty Character Wiki
        </p>

        <form className={styles.search} onSubmit={handleOnSubmitSearch}>
            <input name="query" type="search" />
            <button>Search</button>
        </form>

        <ul className={styles.grid}>
          {results.map(result => {  // map: phương pháp để tạo một thành phần tử danh sách mới cho mỗi kết quả
             const { id, name,image } = result; // id và name từ mỗi kết quả
             return (
              <li key={id} className={styles.card}>
                  <Link href="/character/[id]" as={`/character/${id}`}>
              <a>
              <img src={image} alt={`${name} Thumbnail`} />
                <h3>{ name }</h3>
              </a>
              </Link>
              </li>
              )

          })} 
        </ul> 
        <p>
          <button onClick={handleLoadMore}>Load More</button>
        </p>
          
      </main>


    </div>
  )
}

