import Head from 'next/head'
import Link from 'next/link'

const defaultEndpoint ='https://rickandmortyapi.com/api/character/';

export async function getServerSideProps( { query } ) {
  const { id } = query;
  const res = await fetch(`${defaultEndpoint}/${id}`); 
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}
export default function character({ data }) {
  const { name, image, gender, location, origin, species, status } = data;
  return (
    <div className="container">
      <Head>
            <title> {name} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          {name}
        </h1>
        <div className="profile">
  <div className="profile-image">
    <img src={image} alt={name} />
  </div>
  <div className="profile-details">
    <h2>Character Details</h2>
    <ul>
      <li>
        <strong>Name:</strong> { name }
      </li>
      <li>
        <strong>Status:</strong> { status }
      </li>
      <li>
        <strong>Gender:</strong> { gender }
      </li>
      <li>
        <strong>Species:</strong> { species }
      </li>
      <li>
        <strong>Location:</strong> { location?.name }
      </li>
      <li>
        <strong>Originally From:</strong> { origin?.name }
      </li>
    </ul>
  </div>
</div>
      <p className="back">
        <Link href="/">
          <a>
            Back to All Characters
          </a>
        </Link>
      </p>
      </main>
      <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .main{
        border:5px solid black;
      }
      .title {
          display:flex;
          margin: 0;
          line-height: 1.15;
          justify-content: center;
      }
      .back{
        display:flex;
        justify-content: center;
       }
      .profile {
        display: flex;
        margin-top: 2em;
      }
      
      @media (max-width: 600px) {
        .profile {
          flex-direction: column;
        }
      }
      
      .profile-image {
        margin-right: 2em;
      }
       
      @media (max-width: 600px) {
        .profile-image {
          max-width: 100%;
          margin: 0 auto;
        }
      }
      .back a {
        color: blue;
        text-decoration: underline;
      }
      
`}
      </style>
    </div>
  )
}


