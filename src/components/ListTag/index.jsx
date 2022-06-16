import ListTag1 from './ListTag1'
import {ListTagTeam2 , ListTagLogoSpotify} from '../../utils/allImgs'
function ListTag(){
  return(
    <>
      <ListTag1
              path='/'
              img={ListTagTeam2}
              classOfName="avatar avatar-sm  me-3 "
              text1='New message'
              text2='from Laur'
              text3='13 minutes ago'
      />

      <ListTag1
              path='/'
              img={ListTagLogoSpotify}
              classOfName="avatar avatar-sm bg-gradient-dark  me-3 "
              text1='New album'
              text2='by Travis Scott'
              text3='1 day'
      />
    </>
  )
}

export default ListTag