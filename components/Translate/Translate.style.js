import styled from "styled-components";
import { Menu, List, Grid } from "@material-ui/core";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ButtonGroup = styled.div`
  margin: 0 20px;
  display: flex;
  align-items: center;
  @media (max-width: 720px) {
    justify-content: center;
  }
`;

export const Button = styled.button`
  padding: 10px 15px;
  background: none;
  border: none;
  color: ${(props) => (props.selected ? "#007BFF" : "black")};
  border-bottom: ${(props) => (props.selected ? "2px solid #007BFF" : "none")};
  cursor: pointer;
  font-size: 16px;
  background-color: transparent;
  white-space: nowrap;
  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 720px) {
    margin-right: 0;
    border-bottom: none;
    ${(props) => !props.selected && "display: none;"}
  }
`;

export const FullScreenMenu = styled(Menu)`
  @media (max-width: 720px) {
    .MuiPaper-root {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      margin: 0 !important;
      width: 100% !important;
      height: 100% !important;
      max-height: 100vh !important;
      border-radius: 0 !important;
    }
  }
`;

export const ExpandIconStyled = styled.div`
  transition: transform 0.3s ease;
  transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
  cursor: pointer;
  overflow: visible;
  @media (max-width: 720px) {
    display: none;
  }
`;

export const GridStyled = styled(Grid)`
  flex: 1;
  display: "flex";
  align-items: "center";
`;

export const ButtonStyle = styled(Button)`
  text-transform: none;
  border: none;
  padding: 0 20px;
  min-width: 0;
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const ScrollableList = styled(List)`
  height: 400px;
  overflow-y: auto;
  .FlexWarp {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const CheckIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: right;
`;

export const MenuItemWrapper = styled.div`
  width: 25%;
  @media (max-width: 720px) {
    Button {
      display: flex;
      align-items: center;
    }
    width: 100%;
  }
  @media (min-width: 721px) and (max-width: 1024px) {
    width: 33.33%;
  }
`;

export const SwapIconWrapper = styled.div`
  padding: 0 20px;
  cursor: pointer;
`;

export const CtnUpload = styled.div`
  margin: 0 auto;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 17px;
  width: 98%;
  flex-direction: column;
`;

export const RowUpload = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const ColUpload = styled.div`
  align-items: center;
  justify-content: center;
  flex: 1;
  display: ${(props) => (props.isFileSelected ? "none" : "flex")};
  flex-direction: column;
`;

export const ImgUpload = styled.img`
  width: 280px;
  height: 170px;
`;

export const DropzoneText = styled.div`
  color: rgb(32, 33, 36);
  font-family: "Google Sans", sans-serif;
  font-weight: 400;
  margin-top: 20px;
  font-size: 24px;
`;

export const DividerStyle = styled.div`
  width: 1px;
  background-color: #eeeeee;
  @media (max-width: 720px) {
    display: none;
  }
`;

export const TextTop = styled.div`
  margin: 10px;
  font-weight: 550;
`;

export const BtnUpload = styled.button`
  background-color: rgb(26, 115, 232);
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
  width: 280px;
`;

export const SelectedFileInfo = styled.div`
  display: ${(props) => (props.isFileSelected ? "block" : "none")};
  margin: 50px auto;
  font-size: 18px;
  @media (max-width: 720px) {
    margin: 50px 20px;
  }
`;

export const FileDetailsContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${(props) =>
    props.isFileTranslated ? "rgb(218 232 255)" : "#eeeeee"};
  height: 50px;
  width: 600px;
  @media (max-width: 720px) {
    width: auto;
  }
`;
export const CustomInsertDriveFileIcon = styled(InsertDriveFileIcon)`
  color: ${(props) => (props.isFileTranslated ? "rgb(138, 180, 248)" : "gray")};
  padding: 0 10px;
`;
export const FileName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CloseIconWrapper = styled.div`
  margin-left: auto;
`;
export const TranslationButton = styled.button`
  display: flex;
  margin-left: auto;
  margin-top: 10px;
  background-color: #0770ec;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export const Massage = styled.p`
  text-align: center;
`;

export const ErrorMessage = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border: 1px solid black;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  margin-left: 10px;
`;
