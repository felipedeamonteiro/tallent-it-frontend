import { styled } from '../styles';
import { useState, useEffect } from 'react';
import api from '../services/api';
import Slider from '../components/Slider';

interface usersData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

interface postsData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface lettersPostsData {
  id: number;
  title: string;
  body: string;
}

export interface lettersData {
  id: number;
  name: string; 
  username: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  company: string;
  posts: lettersPostsData[];
}


const Button = styled('button', {
  marginTop: '15px',
  backgroundColor: '$rocketseat',
  border: 'none',
  padding: '10px',
  fontSize: '14px',
  borderRadius: 8,
  color: '#FFF',
  fontStyle: 'Roboto',
  fontWeight: 'bold',
  transition: 'opacity 0.2s',

  '&:hover': {
    opacity: '0.8',
    transition: 'opacity 0.2s'
  }
})

const Container = styled('div', {
  padding: '20px 50px 90px 50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',


  '.page-title': {
    color: '$greenBlue',
    fontWeight: 'bold',
    fontSize: '36px'
  },

  '.text-data': {
    color: '$greenBlue'
  }
})

export default function Home() {
  const [users, setUsers] = useState<usersData[]>([]);
  const [posts, setPosts] = useState<postsData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [letter, setLetter] = useState<lettersData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersResponse = await api.get('users');
        const postsResponse = await api.get('posts');
  
        setUsers(usersResponse.data);
        setPosts(postsResponse.data);
      } catch (err) {
        setErrors(err);
      }
    }
    loadData();
  }, []);

  const getLetter = () => {
    if (errors.length > 0) {
      setShowErrors(true);
      return;
    }

    const letterObject: lettersData[] = users.map((user: usersData) => {
      const allUserPosts = posts.filter((post: postsData) => post.userId === user.id);
      const allValidPostsData = allUserPosts.map((userPost: postsData) => {
        return {
          id: userPost.id,
          title: userPost.title,
          body: userPost.body
        }
      });
      
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: `${user.address.street}, ${user.address.suite} - ${user.address.zipcode} ${user.address.city}`,
        phone: user.phone,
        website: user.website,
        company: user.company.name,
        posts: [...allValidPostsData]
      }
    });

    if (letter.length > 0) {
      setLetter([]);
    } else {
      setLetter(letterObject);
    }

    
  }

  return (
    <Container>
      <h1 className="page-title">Tallent IT Frontend Test</h1>
      <Button onClick={getLetter}>
        {letter.length > 0 ? 
        'Click to remove data' :
        'Click to get data'
        }
      </Button>
      
      {errors.length > 0 
        ? <div>Error</div> 
        : (letter.length > 0 
          ? (<Slider data={letter} />)
          : ''
        )
      }
    </Container>
  )
}
