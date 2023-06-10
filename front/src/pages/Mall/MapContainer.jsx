// MapContainer.js

import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = ({ locations, selectedItemLocate }) => {

    useEffect(() => {
        console.log("맵컨테이너 함수 안: ", selectedItemLocate);
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(37.5469686000002, 127.05732177903647), // 서울을 중심으로 설정
            level: 4
        };
        const map = new kakao.maps.Map(container, options);
        // var moveLatLng = new kakao.maps.LatLng(33.450580, 126.574942);   
        // map.panTo(moveLatLng);
        // 마커 생성 및 표시
        locations.forEach((location) => {
            console.log(location)
            // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
            // const imageSize = new kakao.maps.Size(36, 37); // 마커 이미지의 크기
            // const imgOptions = {
            //     spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            //     spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            //     offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            // };
            const markerPosition = new kakao.maps.LatLng(location.lat, location.lng); // 좌표 순서 수정
            // const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
            const marker = new kakao.maps.Marker({
                map: map,
                position: markerPosition,
                // image: markerImage,
            });
            marker.setMap(map);

            var moveLatLng = new kakao.maps.LatLng(selectedItemLocate.y, selectedItemLocate.x);
        map.panTo(moveLatLng);
        });
    }, [selectedItemLocate]);

    // useEffect(() => {
    //     const container = document.getElementById('myMap');
    //     const options = {
    //         center: new kakao.maps.LatLng(37.5469686000002, 127.05732177903647), // 서울을 중심으로 설정
    //         level: 4
    //     };
    //     const map = new kakao.maps.Map(container, options);
        
    // }, [selectedItemLocate])

    return (
        <div id='myMap' style={{
            width: '1000px',
            height: '500px'
        }}></div>
    );
}

export default MapContainer;