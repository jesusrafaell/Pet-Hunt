import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Link from 'next/link'
import {css} from '@emotion/react'

const Pet = styled.li`
  padding: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  &:hover {
    cursor: pointer;
    color: var(--orange);
  }
`

const TextDescription = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`

const DescriptionPet = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: .3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 1rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin : 0;
	}
  }
`

const Likes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`

const Image = styled.img` 
  width: 200px;
`
export default function DetailsPet({pet}) {

  const {id, comments, create, description, likes, name, urlimg} = pet

  return (
    <Pet>
      <DescriptionPet>
        <div>
          <Link href="/pets/[id]" as={`/pets/${id}`}>
            <Image css={css`
                &:hover {
                  cursor: pointer;
                  opacity: 0.9;
                }
              `}
              src={urlimg} />
          </Link>
        </div>
        <div>
          <Link href="/pets/[id]" as={`/pets/${id}`}>
            <Title>{name}</Title>
          </Link>
          <TextDescription>{description}</TextDescription>
          <Comments>
            <div>
              <img src="/static/img/comment.png" />
              <p> {comments.length} Comments</p>
            </div>
          </Comments>
          <p>Posted {formatDistanceToNow(new Date(create))} ago</p>
        </div>
      </DescriptionPet>
      <Likes>
        <div> &#9650; </div>
        <p>{likes}</p>
      </Likes>
    </Pet>
  )
}

