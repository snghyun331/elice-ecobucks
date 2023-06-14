// MapContainer.js

import React, { useEffect } from 'react';

const { kakao } = window;


const MapContainer = ({ locations, selectedItemLocate }) => {

    useEffect(() => {
        // console.log("맵컨테이너 함수 안: ", selectedItemLocate);
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
            // console.log(location)
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

            var infowindow = new kakao.maps.InfoWindow({
                // content: location.name, // 인포윈도우에 표시할 내용
                content: `<div style="text-align: center;">
                    <strong style="color:red">${location.name}</strong>
                    <br />
                    남은 갯수:${location.stock}
                </div>`
            });

            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다
            // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(
                marker,
                "mouseover",
                makeOverListener(map, marker, infowindow)
            );
            kakao.maps.event.addListener(
                marker,
                "mouseout",
                makeOutListener(infowindow)
            );
            // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
            function makeOverListener(map, marker, infowindow) {
                return function () {
                    infowindow.open(map, marker);
                };
            }

            // 인포윈도우를 닫는 클로저를 만드는 함수입니다
            function makeOutListener(infowindow) {
                return function () {
                    infowindow.close();
                };
            }


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