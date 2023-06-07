import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function MegaChallengeCarousel() {
  const MegaChallenges = [
    {
      title: "메가 돌고래 밥주기",
      description: "돌고래 밥을 줍시다.",
      createDate: "2023-05-01",
      duration: "4주",
      completed: false,
      author: "John Doe",
      icon: "💧",
      participantNumber: 13,
    },
    {
      title: "메가 코드 뽑고 예비전력 아끼기",
      description: "코드 뽑고 예비전력 아껴봅시다.",
      createDate: "2023-05-10",
      duration: "4주",
      completed: false,
      author: "Michael Johnson",
      icon: "🌿",
      participantNumber: 2048,
    },
    {
      title: "메가 텀블러에 음료 테이크아웃",
      description:
        "텀블러에 음료 테이크아웃해봅시다. 용기에 음료 테이크아웃해봅시다...",
      createDate: "2023-05-05",
      duration: "4주",
      completed: false,
      author: "Jane Smith",
      icon: "🌍",
      participantNumber: 571,
    },
    {
      title: "메가 용기에 포장하기",
      description: "용기를 내요",
      createDate: "2023-05-05",
      duration: "4주",
      completed: true,
      author: "Jane Smith",
      icon: "🌍",
      participantNumber: 571,
    },
    // More challenge data...
  ];

  const filteredChallenges = MegaChallenges.filter(
    (challenge) => challenge.completed === false
  ).sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
  

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{ backgroundColor: '#f4d6ff' }}>
      {filteredChallenges.map((challenge, index) => (
        <Carousel.Item key={index}>
          <Carousel.Caption style={{ color: 'white'}}>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MegaChallengeCarousel;
