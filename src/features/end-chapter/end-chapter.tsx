import Banner from '../../components/banner';
import LayoutEndChapter from './layout';

export default function EndChapter() {
  return <div className='flex relative w-full justify-center items-center'>
    <div style={{ width: "fit-content" }}>
      <Banner
        className="fixed top-0 left-[37%] z-10 "
        text="Kết thúc chương"
      />
    </div>
    <LayoutEndChapter
      chapter={<>chapter 1</>}
      description='lorem ipsum dolor sit amet consectetur adipisicing elit'
      progress='60%'
      gift={[
        {},
        {},
        {},
        {},
        {},
        {},
      ]} />
  </div>
} 