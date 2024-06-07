//file translate
import React, { useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { MenuItem, IconButton, Grid, InputBase } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import {
  Container,
  Column,
  Button,
  ButtonGroup,
  ButtonStyle,
  FullScreenMenu,
  ScrollableList,
  SwapIconWrapper,
  ExpandIconStyled,
  CheckIconWrapper,
  MenuItemWrapper,
  GridStyled,
  CtnUpload,
  RowUpload,
  ColUpload,
  ImgUpload,
  DropzoneText,
  DividerStyle,
  TextTop,
  BtnUpload,
  SelectedFileInfo,
  FileDetailsContainer,
  FileName,
  CustomInsertDriveFileIcon,
  CloseIconWrapper,
  TranslationButton,
  Massage,
  ErrorMessage,
  CloseButton,
} from "./Translate.style";

const Translate = () => {
  const [sourceLanguages, setSourceLanguages] = useState([
    languages[0],
    languages[1],
    languages[2],
    languages[3],
  ]);
  const [targetLanguages, setTargetLanguages] = useState([
    languages[1],
    languages[2],
    languages[3],
  ]);
  const [selectedSourceLanguage, setSelectedSourceLanguage] = useState(
    languages[0]
  );
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState(
    languages[1]
  );

  const filteredTargetLanguages = targetLanguages.filter(
    (lang) => lang.code !== "auto"
  );

  //start

  const getNextLanguageInList = (currentLanguage, direction, languageList) => {
    const filteredLanguages = languageList.filter(
      (lang) => lang.code !== "auto"
    );

    const currentIndex = filteredLanguages.findIndex(
      (lang) => lang.code === currentLanguage.code
    );
    let nextIndex;

    if (direction === "previous") {
      nextIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredLanguages.length - 1;
    } else {
      nextIndex =
        currentIndex < filteredLanguages.length - 1 ? currentIndex + 1 : 0;
    }

    return filteredLanguages[nextIndex];
  };

  const handleSourceLanguageChange = (lang) => {
    if (selectedSourceLanguage && selectedSourceLanguage.code === lang.code) {
      setAnchorElSource(
        anchorElSource ? null : document.querySelector(`#button-${lang.code}`)
      );
    } else {
      setSourceLanguages((prevLanguages) => {
        if (lang.code !== "auto") {
          const index = prevLanguages.findIndex(
            (item) => item.code === lang.code
          );
          let newSourceLanguages;
          if (index === -1) {
            const previousTargetLanguage = selectedTargetLanguage;
            if (prevLanguages.length > 3) {
              newSourceLanguages = [
                prevLanguages[0],
                lang,
                ...prevLanguages.slice(1, 3),
              ];
            } else {
              newSourceLanguages = [lang, ...prevLanguages];
            }

            if (
              previousTargetLanguage &&
              previousTargetLanguage.code === lang.code
            ) {
              const newTargetLanguage = getNextLanguageInList(
                previousTargetLanguage,
                "next",
                targetLanguages
              );
              setSelectedTargetLanguage(newTargetLanguage);
              console.log("New target language:", newTargetLanguage);
            }
          } else {
            newSourceLanguages = [...prevLanguages];
          }
          return newSourceLanguages;
        } else {
          return prevLanguages;
        }
      });
      setSelectedSourceLanguage(lang);

      if (lang.code === selectedTargetLanguage.code) {
        const newTargetLanguage = getNextLanguageInList(
          selectedTargetLanguage,
          "next",
          targetLanguages
        );
        setSelectedTargetLanguage(newTargetLanguage);
        console.log("New target language:", newTargetLanguage);
      }

      console.log("Check source:", lang);
    }
  };

  const handleTargetLanguageChange = (lang) => {
    if (selectedTargetLanguage && selectedTargetLanguage.code === lang.code) {
      setAnchorElTarget(
        anchorElTarget ? null : document.querySelector(`#button-${lang.code}`)
      );
    } else {
      setTargetLanguages((prevLanguages) => {
        if (lang.code !== "auto") {
          const index = prevLanguages.findIndex(
            (item) => item.code === lang.code
          );
          let newTargetLanguages;
          if (index === -1) {
            const previousSourceLanguage = selectedSourceLanguage;
            newTargetLanguages = [lang, ...prevLanguages.slice(0, 2)];
            if (
              previousSourceLanguage &&
              previousSourceLanguage.code === lang.code
            ) {
              const newSourceLanguage = getNextLanguageInList(
                previousSourceLanguage,
                "previous",
                sourceLanguages
              );
              setSelectedSourceLanguage(newSourceLanguage);
              console.log("New source language:", newSourceLanguage);
            }
          } else {
            newTargetLanguages = [...prevLanguages];
          }
          return newTargetLanguages;
        } else {
          return prevLanguages;
        }
      });
      setSelectedTargetLanguage(lang);

      if (lang.code === selectedSourceLanguage.code) {
        const newSourceLanguage = getNextLanguageInList(
          selectedSourceLanguage,
          "previous",
          sourceLanguages
        );
        setSelectedSourceLanguage(newSourceLanguage);
        console.log("New source language:", newSourceLanguage);
      }

      console.log("Check target:", lang);
    }
  };

  const handleSwapLanguages = () => {
    if (selectedSourceLanguage.code !== "auto") {
      const newSourceLanguage = selectedTargetLanguage;
      const newTargetLanguage = selectedSourceLanguage;

      setSelectedSourceLanguage(newSourceLanguage);
      setSelectedTargetLanguage(newTargetLanguage);

      const updatedSourceLanguages = [...sourceLanguages];
      const updatedTargetLanguages = [...targetLanguages];

      const sourceIndex = updatedSourceLanguages.findIndex(
        (lang) => lang.code === newSourceLanguage.code
      );
      const targetIndex = updatedTargetLanguages.findIndex(
        (lang) => lang.code === newTargetLanguage.code
      );

      if (sourceIndex === -1) {
        updatedSourceLanguages.splice(1, 0, newSourceLanguage);
      }
      if (targetIndex === -1) {
        updatedTargetLanguages.unshift(newTargetLanguage);
      }
      setSourceLanguages(updatedSourceLanguages.slice(0, 4));
      setTargetLanguages(updatedTargetLanguages.slice(0, 3));
    }
  };

  //end

  const [anchorElSource, setAnchorElSource] = useState(null);
  const [anchorElTarget, setAnchorElTarget] = useState(null);

  // search
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSource = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    const results = searchLanguages(query, true);
    setSearchResults(results);
  };

  const handleSearchTarget = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    const results = searchLanguages(query, false);
    setSearchResults(results);
  };

  const searchLanguages = (query, isTargetLanguege) => {
    if (!query.trim()) {
      return [];
    } else {
      return languages.filter(
        (lang) =>
          lang.name.toLowerCase().includes(query.toLowerCase()) &&
          (isTargetLanguege || lang.name !== "Phát hiện ngôn ngữ")
      );
    }
  };
  //end search

  const handleClickSource = (event) => {
    setAnchorElSource(event.currentTarget);
  };

  const handleCloseSource = () => {
    setAnchorElSource(null);
  };

  const handleClickTarget = (event) => {
    setAnchorElTarget(event.currentTarget);
  };

  const handleCloseTarget = () => {
    setAnchorElTarget(null);
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const [isTranslateMode, setIsTranslateMode] = useState(false);

  useEffect(() => {
    if (!anchorElSource) {
      setIsTranslateMode(false);
      setSearchValue("");
    }
  }, [anchorElSource]);

  const handleSearchClick = () => {
    setIsTranslateMode(false);
  };

  const handleCloseMenu = () => {
    setIsTranslateMode(false);
    handleCloseSource();
    handleCloseTarget();
  };
  //end

  //mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth < 720);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isFileTranslated, setIsFileTranslated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [translatedFile, setTranslatedFile] = useState(null);

  useEffect(() => {
    // Xoá thông báo lỗi sau 5 giây
    const timer = setTimeout(() => {
      setErrorMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setSelectedFile(file);
        setIsFileSelected(true);
      } else {
        setSelectedFile(null);
        setIsFileSelected(false);
        setErrorMessage("Không thể dịch định dạng tệp này");
      }
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setIsFileSelected(false);
    setIsFileTranslated(false);
    fileInputRef.current.value = "";
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (
          file.type === "application/pdf" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          setSelectedFile(file);
          setIsFileSelected(true);
        } else {
          setSelectedFile(null);
          setIsFileSelected(false);
          setErrorMessage("Không thể dịch định dạng tệp này");
        }
      } else if (rejectedFiles.length > 0) {
        setSelectedFile(null);
        setIsFileSelected(false);
        setErrorMessage("Không thể dịch định dạng tệp này");
      }
    },
  });

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("sourceLang", selectedSourceLanguage.code);
      formData.append("targetLang", selectedTargetLanguage.code);

      axios
        .post("http://localhost:3001/translate", formData, {
          responseType: "blob",
        })
        .then((response) => {
          if (response.status === 200) {
            const blob = new Blob([response.data], {
              type: response.data.type,
            });
            setTranslatedFile(blob);
            setIsFileTranslated(true);
          } else {
            console.error("Dịch lỗi:", response.data.error);
          }
        })
        .catch((error) => {
          console.error("Lỗi dịch file:", error);
        });
    }
  };

  const handleDownload = () => {
    if (translatedFile instanceof Blob) {
      const url = URL.createObjectURL(translatedFile);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", selectedFile.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      console.error("translatedFile không phải là Blob hợp lệ");
    }
  };

  return (
    <>
      <Container>
        <Column>
          <ButtonGroup>
            {sourceLanguages.map((lang) => (
              <Button
                key={lang.code}
                id={`button-${lang.code}`}
                onClick={() => handleSourceLanguageChange(lang)}
                selected={
                  selectedSourceLanguage &&
                  selectedSourceLanguage.code === lang.code
                }
              >
                {lang.name}
              </Button>
            ))}
            <ExpandIconStyled
              open={Boolean(anchorElSource)}
              onClick={handleClickSource}
            >
              <ExpandMoreIcon />
            </ExpandIconStyled>
            <FullScreenMenu
              anchorEl={isMobile ? null : anchorElSource}
              keepMounted
              open={Boolean(anchorElSource)}
              onClose={handleCloseSource}
              PaperProps={{
                style: isMobile
                  ? {
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      borderRadius: 0,
                      marginTop: 0,
                      border: "none",
                      overflow: "hidden",
                    }
                  : {
                      marginTop: "32px",
                      borderRadius: "25px",
                      border: "1px solid #ccc",
                      overflow: "hidden",
                      maxHeight: "100vh",
                      width: "100%",
                    },
              }}
              anchorOrigin={{
                vertical: isMobile ? "top" : "bottom",
                horizontal: isMobile ? "right" : "left",
              }}
              transformOrigin={{
                vertical: isMobile ? "top" : "bottom",
                horizontal: isMobile ? "right" : "left",
              }}
              getContentAnchorEl={null}
            >
              <Grid container alignItems="center">
                {isMobile ? (
                  <>
                    <Grid item>
                      {!isTranslateMode ? (
                        <IconButton onClick={handleCloseMenu}>
                          <ArrowBackIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => {
                            setIsTranslateMode(false);
                          }}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      )}
                    </Grid>

                    <GridStyled>
                      {isTranslateMode ? (
                        <InputBase
                          placeholder="Tìm kiếm ngôn ngữ"
                          style={{
                            width: "100%",
                            border: "none",
                          }}
                          endAdornment={
                            searchValue && (
                              <IconButton onClick={() => setSearchValue("")}>
                                <ClearIcon />
                              </IconButton>
                            )
                          }
                          value={searchValue}
                          onChange={handleSearchSource}
                        />
                      ) : (
                        <ButtonStyle
                          onClick={() => {
                            setIsTranslateMode(true);
                            setSearchValue("");
                          }}
                        >
                          Dịch từ
                        </ButtonStyle>
                      )}
                    </GridStyled>
                    {!isTranslateMode ? (
                      <>
                        <Grid item>
                          <IconButton
                            onClick={() => {
                              setIsTranslateMode(true);
                              setSearchValue("");
                            }}
                          >
                            <SearchIcon />
                          </IconButton>
                        </Grid>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    {!isTranslateMode && (
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            setIsTranslateMode(!isTranslateMode);
                            setSearchValue("");
                          }}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      </Grid>
                    )}
                    <GridStyled>
                      {isTranslateMode ? (
                        <ButtonStyle
                          onClick={() => {
                            setIsTranslateMode(false);
                            setSearchValue("");
                          }}
                        >
                          Dịch từ
                        </ButtonStyle>
                      ) : (
                        <InputBase
                          placeholder="Tìm kiếm ngôn ngữ"
                          style={{
                            width: "100%",
                            border: "none",
                          }}
                          endAdornment={
                            searchValue && (
                              <IconButton onClick={() => setSearchValue("")}>
                                <ClearIcon />
                              </IconButton>
                            )
                          }
                          value={searchValue}
                          onChange={handleSearchSource}
                        />
                      )}
                    </GridStyled>
                    {isTranslateMode ? (
                      <>
                        <Grid item>
                          <IconButton onClick={handleSearchClick}>
                            <SearchIcon />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={handleCloseMenu}>
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </>
                    ) : null}
                  </>
                )}
              </Grid>
              <Divider />
              <ScrollableList component="nav">
                <div className="FlexWarp">
                  {searchValue ? (
                    searchResults.length > 0 ? (
                      searchResults.map((lang) => (
                        <MenuItem
                          key={lang.code}
                          onClick={() => {
                            handleSourceLanguageChange(lang);
                            handleCloseTarget();
                            handleCloseSource();
                          }}
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "5px",
                            backgroundColor:
                              selectedSourceLanguage &&
                              selectedSourceLanguage.code === lang.code
                                ? "#cceeff"
                                : "transparent",
                          }}
                        >
                          <CheckIconWrapper>
                            {selectedSourceLanguage &&
                              selectedSourceLanguage.code === lang.code && (
                                <CheckIcon style={{ color: "#0066cc" }} />
                              )}
                          </CheckIconWrapper>
                          <span
                            style={{
                              color:
                                selectedSourceLanguage &&
                                selectedSourceLanguage.code === lang.code
                                  ? "#0066cc"
                                  : "inherit",
                            }}
                          >
                            {lang.name}
                          </span>
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem
                        disabled
                        style={{
                          fontSize: "26px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Không có kết quả
                      </MenuItem>
                    )
                  ) : (
                    languages.map((lang) => (
                      <MenuItemWrapper key={lang.code}>
                        <MenuItem
                          onClick={() => {
                            handleSourceLanguageChange(lang);
                            handleCloseTarget();
                            handleCloseSource();
                          }}
                          style={{
                            boxSizing: "border-box",
                            padding: "5px",
                            backgroundColor:
                              selectedSourceLanguage &&
                              selectedSourceLanguage.code === lang.code
                                ? "#cceeff"
                                : "transparent",
                          }}
                        >
                          <CheckIconWrapper>
                            {selectedSourceLanguage &&
                              selectedSourceLanguage.code === lang.code && (
                                <CheckIcon style={{ color: "#0066cc" }} />
                              )}
                          </CheckIconWrapper>
                          <span
                            style={{
                              color:
                                selectedSourceLanguage &&
                                selectedSourceLanguage.code === lang.code
                                  ? "#0066cc"
                                  : "inherit",
                            }}
                          >
                            {lang.name}
                          </span>
                        </MenuItem>
                      </MenuItemWrapper>
                    ))
                  )}
                </div>
              </ScrollableList>
            </FullScreenMenu>
          </ButtonGroup>
        </Column>

        <SwapIconWrapper>
          <SwapHorizIcon onClick={handleSwapLanguages} fontSize="large" />
        </SwapIconWrapper>

        <Column>
          <ButtonGroup>
            {filteredTargetLanguages.map((lang) => (
              <Button
                key={lang.code}
                id={`button-${lang.code}`}
                onClick={() => handleTargetLanguageChange(lang)}
                selected={
                  selectedTargetLanguage &&
                  selectedTargetLanguage.code === lang.code
                }
              >
                {lang.name}
              </Button>
            ))}
            <ExpandIconStyled
              open={Boolean(anchorElTarget)}
              onClick={handleClickTarget}
            >
              <ExpandMoreIcon />
            </ExpandIconStyled>
            <FullScreenMenu
              anchorEl={isMobile ? null : anchorElTarget}
              keepMounted
              open={Boolean(anchorElTarget)}
              onClose={handleCloseTarget}
              PaperProps={{
                style: isMobile
                  ? {
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      borderRadius: 0,
                      marginTop: 0,
                      border: "none",
                      overflow: "hidden",
                    }
                  : {
                      marginTop: "32px",
                      borderRadius: "25px",
                      border: "1px solid #ccc",
                      overflow: "hidden",
                      maxHeight: "100vh",
                      width: "100%",
                    },
              }}
              anchorOrigin={{
                vertical: isMobile ? "top" : "bottom",
                horizontal: isMobile ? "right" : "left",
              }}
              transformOrigin={{
                vertical: isMobile ? "top" : "bottom",
                horizontal: isMobile ? "right" : "left",
              }}
              getContentAnchorEl={null}
            >
              <Grid container alignItems="center">
                {!isTranslateMode && (
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        setIsTranslateMode(!isTranslateMode),
                          setSearchValue("");
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </Grid>
                )}
                <GridStyled>
                  {isTranslateMode ? (
                    <ButtonStyle
                      onClick={() => {
                        setIsTranslateMode(false), setSearchValue("");
                      }}
                    >
                      Dịch từ
                    </ButtonStyle>
                  ) : (
                    <InputBase
                      placeholder="Tìm kiếm ngôn ngữ"
                      style={{
                        width: "100%",
                        border: "none",
                      }}
                      endAdornment={
                        searchValue && (
                          <IconButton onClick={() => setSearchValue("")}>
                            <ClearIcon />
                          </IconButton>
                        )
                      }
                      value={searchValue}
                      onChange={handleSearchTarget}
                    />
                  )}
                </GridStyled>
                {isTranslateMode ? (
                  <>
                    <Grid item>
                      <IconButton onClick={handleSearchClick}>
                        <SearchIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={handleCloseMenu}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </>
                ) : null}
              </Grid>
              <Divider />
              <ScrollableList component="nav">
                <div className="FlexWarp">
                  {searchValue ? (
                    searchResults.length > 0 ? (
                      searchResults.map((lang) => (
                        <MenuItem
                          key={lang.code}
                          onClick={() => {
                            handleTargetLanguageChange(lang);
                            handleCloseTarget();
                            handleCloseSource();
                          }}
                          style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "5px",
                            backgroundColor:
                              selectedTargetLanguage &&
                              selectedTargetLanguage.code === lang.code
                                ? "#cceeff"
                                : "transparent",
                          }}
                        >
                          <CheckIconWrapper>
                            {selectedTargetLanguage &&
                              selectedTargetLanguage.code === lang.code && (
                                <CheckIcon style={{ color: "#0066cc" }} />
                              )}
                          </CheckIconWrapper>
                          <span
                            style={{
                              color:
                                selectedTargetLanguage &&
                                selectedTargetLanguage.code === lang.code
                                  ? "#0066cc"
                                  : "inherit",
                            }}
                          >
                            {lang.name}
                          </span>
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem
                        disabled
                        style={{
                          fontSize: "26px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Không có kết quả
                      </MenuItem>
                    )
                  ) : (
                    languages.map(
                      (lang) =>
                        lang.code !== "auto" && (
                          <MenuItemWrapper key={lang.code}>
                            <MenuItem
                              onClick={() => {
                                handleTargetLanguageChange(lang);
                                handleCloseTarget();
                                handleCloseSource();
                              }}
                              style={{
                                // width: "100%",
                                boxSizing: "border-box",
                                padding: "5px",
                                backgroundColor:
                                  selectedTargetLanguage &&
                                  selectedTargetLanguage.code === lang.code
                                    ? "#cceeff"
                                    : "transparent",
                              }}
                            >
                              <CheckIconWrapper>
                                {selectedTargetLanguage &&
                                  selectedTargetLanguage.code === lang.code && (
                                    <CheckIcon style={{ color: "#0066cc" }} />
                                  )}
                              </CheckIconWrapper>
                              <span
                                style={{
                                  color:
                                    selectedTargetLanguage &&
                                    selectedTargetLanguage.code === lang.code
                                      ? "#0066cc"
                                      : "inherit",
                                }}
                              >
                                {lang.name}
                              </span>
                            </MenuItem>
                          </MenuItemWrapper>
                        )
                    )
                  )}
                </div>
              </ScrollableList>
            </FullScreenMenu>
          </ButtonGroup>
        </Column>
      </Container>
      <CtnUpload>
        <RowUpload>
          <ColUpload isFileSelected={!!selectedFile} {...getRootProps()}>
            <input
              {...getInputProps({
                accept: ".pdf,.docx",
              })}
            />
            <ImgUpload
              src="/images/translate/drag-and-drop.png"
              alt="drag and drop"
            />
            <DropzoneText isFileSelected={!!selectedFile}>
              Kéo và thả
            </DropzoneText>
          </ColUpload>
          <DividerStyle />
          <ColUpload isFileSelected={!!selectedFile}>
            <TextTop>Hoặc chọn một tệp</TextTop>
            <BtnUpload onClick={handleButtonClick}>Duyệt qua các tệp</BtnUpload>
            <p>Các loại tệp được hỗ trợ: .docx, .pdf.</p>
          </ColUpload>
          <SelectedFileInfo isFileSelected={!!selectedFile}>
            <FileDetailsContainer isFileTranslated={isFileTranslated}>
              <CustomInsertDriveFileIcon
                isFileTranslated={isFileTranslated}
                fontSize="large"
              />
              <FileName>
                <span>{selectedFile && selectedFile.name}</span>
                <span>
                  {selectedFile && (selectedFile.size / 1024).toFixed(2)} KB
                </span>
              </FileName>

              <CloseIconWrapper>
                <CloseIcon
                  onClick={handleClearFile}
                  style={{ cursor: "pointer" }}
                />
              </CloseIconWrapper>
            </FileDetailsContainer>
            <TranslationButton
              onClick={isFileTranslated ? handleDownload : handleUpload}
              isFileTranslated={isFileTranslated}
            >
              {isFileTranslated ? "Tải Tệp" : "Dịch"}
            </TranslationButton>
          </SelectedFileInfo>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".pdf,.docx"
          />
        </RowUpload>
        <Massage>Do Google Cloud Translation cung cấp</Massage>
      </CtnUpload>
      {errorMessage && (
        <ErrorMessage>
          {errorMessage}
          <CloseButton onClick={() => setErrorMessage("")}>Đã hiểu</CloseButton>
        </ErrorMessage>
      )}
    </>
  );
};

export default Translate;

const languages = [
  { code: "auto", name: "Phát hiện ngôn ngữ" },
  { code: "en", name: "Anh" },
  { code: "es", name: "Tây Ban Nha" },
  { code: "fr", name: "Pháp" },
  { code: "de", name: "Đức" },
  { code: "pt", name: "Bồ Đào Nha" },
  { code: "ru", name: "Nga" },
  { code: "zh-CN", name: "Trung (Giản thể)" },
  { code: "zh-TW", name: "Trung (Phồn thể)" },
  { code: "ko", name: "Hàn" },
  { code: "ja", name: " Nhật" },
  { code: "th", name: " Thái" },
  { code: "ar", name: " Ả Rập" },
  { code: "hi", name: " Hindi" },
  { code: "id", name: " Indonesia" },
  { code: "vi", name: " Việt" },
  { code: "pl", name: " Ba Lan" },
  { code: "sv", name: " Thụy Điển" },
  { code: "fi", name: " Phần Lan" },
  { code: "da", name: " Đan Mạch" },
  { code: "nl", name: " Hà Lan" },
  { code: "el", name: " Hy Lạp" },
  { code: "tr", name: " Thổ Nhĩ Kỳ" },
  { code: "he", name: " Hébrew" },
  { code: "ro", name: " Rumani" },
  { code: "no", name: " Na Uy" },
  { code: "ca", name: " Catalan" },
  { code: "hu", name: " Hungarian" },
  { code: "ms", name: " Malay" },
  { code: "sw", name: " Swahili" },
  { code: "fil", name: " Filipino" },
  { code: "sr", name: " Serb" },
  { code: "af", name: " Afrikaans" },
  { code: "sq", name: " Albania" },
  { code: "am", name: " Amharic" },
  { code: "hy", name: " Armenia" },
  { code: "az", name: " Azerbaijan" },
  { code: "eu", name: " Basque" },
  { code: "be", name: " Belarus" },
  { code: "bn", name: " Bengali" },
  { code: "bs", name: " Bosnia" },
  { code: "bg", name: " Bulgaria" },
  { code: "ceb", name: " Cebuano" },
  { code: "ny", name: " Chichewa" },
  { code: "co", name: " Corsica" },
  { code: "hr", name: " Croatia" },
  { code: "cy", name: "Wales" },
  { code: "cs", name: "Czech" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonia" },
  { code: "tl", name: "Filipino" },
  { code: "fy", name: "Frisia" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgia" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haiti" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaii" },
  { code: "iw", name: "Hebrew" },
  { code: "hmn", name: "Hmong" },
  { code: "it", name: "Italy" },
  { code: "jv", name: "Java" },
  { code: "kn", name: "Kannada" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "ku", name: "Kurd" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvia" },
  { code: "lt", name: "Lithuania" },
  { code: "lb", name: "Luxembourg" },
  { code: "mk", name: "Macedonia" },
  { code: "mg", name: "Malagasy" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Malta" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mn", name: "Mongolia" },
  { code: "my", name: "Myanmar (Burmese)" },
  { code: "ne", name: "Nepal" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pa", name: "Punjabi" },
  { code: "sm", name: "Samoa" },
  { code: "gd", name: "Scotland" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovakia" },
  { code: "sl", name: "Slovenia" },
  { code: "so", name: "Somali" },
  { code: "su", name: "Sundanese" },
  { code: "tg", name: "Tajik" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "uk", name: "Ukraine" },
  { code: "ur", name: "Urdu" },
  { code: "uz", name: "Uzbek" },
  { code: "xh", name: "Xhosa" },
  { code: "zo", name: "Séc" },
];
