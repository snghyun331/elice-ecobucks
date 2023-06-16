import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import * as Api from "../../api";
import { formatDate } from "../../util/common";
import ChallengeParticipate from "./ChallengeParticipate";
import { UserStateContext } from "../../context/user/UserProvider";
import ChallengeUpdate from "./ChallengeUpdate";
import ChallengeComments from "./ChallengeComments";
import { showAlert } from "../../assets/alert";

const ChallengeRead = ({ challenge, onBackToListClick }) => {
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState("");

  const userState = useContext(UserStateContext);

  const handleJoinClick = () => {
    setShowParticipateModal(true);
  };

  const handleUpdateClick = () => {
    if (challenge.participantsCount >= 1) {
      return;
    }
    setShowUpdateModal(true);
  };

  const handleCloseParticipateModal = () => {
    setShowParticipateModal(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const isCurrentUserAuthor = userState.user._id === challenge.userId._id;

  const handleDeleteClick = async () => {
    if (challenge.participantsCount >= 1) {
      showAlert("참가자가 1명 이상이므로 수정, 삭제할 수 없습니다");
      return;
    }
    const confirmDelete = window.confirm("챌린지를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await Api.delete(`challenges/${challenge._id}`);
        window.location.reload();
      } catch (err) {
        showAlert(err.res.data);
      }
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await Api.get(`challenges/${challenge._id}/comments`);
        setComments(res.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [challenge]);

  return (
    <Container className="mt-1" style={{paddingLeft: '90px', paddingRight: '90px'}}>
      <Card className="m-2">
        <Card.Body>
          <Card.Title><h4>{challenge.title}</h4></Card.Title>
          <Card.Text>{challenge.content}</Card.Text>
          <Card.Text style={{fontSize: '0.8em', textAlign: 'right'}}>
            작성일자: {formatDate(challenge.createdAt)}
            <br />
            마감일자: {formatDate(challenge.dueDate)}
            <br />
            작성자: {challenge.userId.userName}
            <br />
            참여인원: {challenge.participantsCount.toLocaleString()} 명
          </Card.Text>
    <hr />
          <ChallengeComments challenge={challenge} />
        </Card.Body>
      </Card>

      <>
        <Button
          className="mt-3 ms-2"
          onClick={handleJoinClick}
          variant="light"
          style={{

            marginBottom: "30px",
            color: "white",
            borderRadius: "0px",
            width: "10%",
            backgroundColor: "#00D387",
          }}
        >
          참가하기
        </Button>
      </>
      {isCurrentUserAuthor && (
        <>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-disabled">
                참가자가 있을 시 수정, 삭제할 수 없습니다.
              </Tooltip>
            }
          >
            <a>
              <Button
                className="mt-3 ms-2"
                onClick={handleUpdateClick}
                disabled={challenge.participantsCount >= 1}
                variant="light"
                style={{
      
                  marginBottom: "30px",
                  color: "white",
                  borderRadius: "0px",
                  width: "10%",
                  backgroundColor: "#00D387",
                }}
              >
                수정하기
              </Button>
            </a>
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-disabled">
                참가자가 있을 시 수정, 삭제할 수 없습니다.
              </Tooltip>
            }
          >
            <a>
              <Button
                className="mt-3 ms-2"
                onClick={handleDeleteClick}
                disabled={challenge.participantsCount >= 1}
                variant="light"
                style={{
      
                  marginBottom: "30px",
                  color: "white",
                  borderRadius: "0px",
                  width: "10%",
                  backgroundColor: "#00D387",
                }}
              >
                삭제하기
              </Button>
            </a>
          </OverlayTrigger>
        </>
      )}
      <Button
        onClick={onBackToListClick}
        className="mt-3 ms-2"
        variant="light"
        style={{
          marginBottom: "30px",
          color: "white",
          borderRadius: "0px",
          width: "10%",
          backgroundColor: "#00D387",
        }}
      >
        목록으로
      </Button>

      <ChallengeParticipate
        show={showParticipateModal}
        onClose={handleCloseParticipateModal}
        challenge={challenge}
      />

      <ChallengeUpdate
        show={showUpdateModal}
        onClose={handleCloseUpdateModal}
        challenge={challenge}
      />
    </Container>
  );
};

export default ChallengeRead;
