// MapContainer.js

import React, { useEffect } from 'react';

const { kakao } = window;


const MapContainer = ({ locations, selectedItemLocate }) => {

    useEffect(() => {
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(37.5469686000002, 127.05732177903647), // 서울을 중심으로 설정
            level: 4, //지도 확대 레벨
            draggable: false// 마우스로 이동 제한
        };
        const map = new kakao.maps.Map(container, options);

        // 마커 생성 및 표시
        locations.forEach((location) => {

            const markerPosition = new kakao.maps.LatLng(location.lat, location.lng); // 좌표 순서 수정
            const marker = new kakao.maps.Marker({
                map: map,
                position: markerPosition,
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


    return (
        <div id='myMap' style={{
            width: '1000px',
            height: '500px',
            borderRadius: '15px'
        }}></div>
    );
}

export default MapContainer;