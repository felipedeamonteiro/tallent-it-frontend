import { styled } from '../styles';
import { useState, useEffect } from 'react';
import api from '../services/api';

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

interface lettersPostsData {
  id: number;
  title: string;
  body: string;
}

interface lettersData {
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
  backgroundColor: '$rocketseat'
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

    setLetter(letterObject);
  }

  return (
    <>
      <h1>Tallent IT Frontend Test</h1>
      <Button onClick={getLetter} >Mah Oeeee!</Button>
      {errors.length > 0 
        ? <div>Deu erro!</div> 
        : (
          <div>
            {JSON.parse(letter.toString())}
          </div>
        )
      }
    </>
  )
}
