import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AppLayout from "@/components/Layouts/AppLayoutcomponents";
import SearchBar from "@/components/UI/SearchBar/SearchBarcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import MessagePreview from "@/components/Chat/MessagePreview/MessagePreviewcomponents";
import AvatarInfoCard from "@/components/Chat/AvatarInfoCard/AvatarInfoCardcomponents";
import Tooltip from "@/components/UI/Tooltip/Tooltipcomponents";
import Switch from "@/components/UI/Switch/Switchcomponents";
import ChatBox from "@/components/Chat/ChatBox/ChatBoxcomponents";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { config } from "@/configcomponents";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCookies } from "react-cookie";
import { useRef } from "react";
import TxModal from "@/components/Modals/TxModal/TxModalcomponents";
import { isInstalled, sendPayment } from "@gemwallet/api";

export default function Chat() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(config.ws_url, {
    onOpen: () => console.log("WS opened"),
    shouldReconnect: (closeEvent) => true,
    onClose: () => console.log("WS closed"),
  });
  const [cookies] = useCookies(["token"]);
  const [uData, setUData] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedUserHref, setSelectedUserHref] = useState(null);
  const [sendXrpl, setSendXrpl] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (lastMessage !== null) {
      // console.log("Received message", lastMessage);
      const message = JSON.parse(lastMessage.data);
      if (message.type === "authenticate") {
        if (message.success) {
          console.log("Authenticated successfully");
          setUData(message);
        } else {
          console.log("Authentication failed");
        }
      } else if (message.type === "getConversations") {
        if ("error" in message) {
          console.log("Error", message.error);
        } else if ("users" in message) {
          const msgs = message.users.map((user) => {
            return {
              userName: user.username,
              messagePreview: user.last_message.content,
              messageTimestamp: new Date(
                user.last_message.created
              ).toISOString(),
              avatar: user.pfp,
              conversation_id: user.last_message.conversation_id,
            };
          });

          //sort according to the timestamp
          msgs.sort((a, b) => {
            return new Date(b.messageTimestamp) - new Date(a.messageTimestamp);
          });

          setConversations(msgs);
          if (msgs.length > 0) {
            setSelectedMessage(msgs[0]);
          }
          setLoading(false);
        }
      } else if (message.type === "createDm") {
        console.log("Created DM", message.data);
      } else if (message.type === "getMessages") {
        //append messages to the conversation
        console.log("Received messages", message);
        if ("error" in message) {
          console.log("Error", message.error);
        } else if ("messages" in message) {
          const convos = {};
          message.messages.forEach((msg) => {
            if (msg.conversation_id in convos) {
              convos[msg.conversation_id].push(msg);
            } else {
              convos[msg.conversation_id] = [msg];
            }
          });

          for (const convo in convos) {
            convos[convo].reverse();
          }
          setMessages(convos);
          console.log("Messages", convos);
        }
      } else if (message.type === "sendMessage") {
        if ("refresh" in message) {
          if (message.refresh) {
            //send message to getConversation
            sendMessage(
              JSON.stringify({
                type: "getConversations",
                token: cookies.token,
              })
            );
          }
        }
        if (message.success) {
          // Create a copy of the messages state
          const convos = { ...messages };
          if (message.data.conversation_id in convos) {
            convos[message.data.conversation_id].push(message.data);
          } else {
            convos[message.data.conversation_id] = [message.data];
          }
          setMessages(convos);
          //update the conversation preview
          const convoIndex = conversations.findIndex(
            (convo) => convo.conversation_id === message.data.conversation_id
          );
          const convo = { ...conversations[convoIndex] };
          convo.messagePreview = message.data.content;
          convo.messageTimestamp = new Date(message.data.created).toISOString();
          // Create a copy of the conversations state
          const newConversations = [...conversations];
          newConversations[convoIndex] = convo;
          //sort according to the timestamp
          newConversations.sort((a, b) => {
            return new Date(b.messageTimestamp) - new Date(a.messageTimestamp);
          });
          setConversations(newConversations);
        }
      } else if (message.type === "subscribeChatUser") {
        console.log("Subscribed to chat user", message);
        if ("error" in message) {
          console.log("Error", message.error);
        } else if ("success" in message && "data" in message) {
          const convos = { ...messages };
          if (message.data.conversation_id in convos) {
            convos[message.data.conversation_id].push(message.data);
          } else {
            convos[message.data.conversation_id] = [message.data];
          }
          setMessages(convos);
          //update the conversation preview
          const convoIndex = conversations.findIndex(
            (convo) => convo.conversation_id === message.data.conversation_id
          );
          const convo = { ...conversations[convoIndex] };
          convo.messagePreview = message.data.content;
          convo.messageTimestamp = new Date(message.data.created).toISOString();
          // Create a copy of the conversations state
          const newConversations = [...conversations];
          newConversations[convoIndex] = convo;
          setConversations(newConversations);
        }
      } else if (message.type === "searchUser") {
        console.log("Search results", message);
        if ("error" in message) {
          console.log("Error", message.error);
        } else if ("data" in message) {
          console.log("Search results", message.data);
          // setSearchResults(message.data);
          //if the current user is also in the search results, remove it
          const filteredResults = message.data.filter(
            (user) => user.id !== uData.uid
          );
          setSearchResults(filteredResults);
        }
      } else if (message.type === "getWalletFromUname") {
        console.log("Wallet from username", message);
        setSelectedUserHref(`/user/${message.data.wallet}`);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN && cookies.token) {
      if (
        cookies.token !== undefined &&
        cookies.token !== null &&
        cookies.token !== "" &&
        cookies.token !== "null" &&
        cookies.token !== "undefined"
      ) {
        console.log(`Authenticating: ${cookies.token}`);
        sendMessage(
          JSON.stringify({ type: "authenticate", token: cookies.token })
        );
      }
    }
  }, [readyState, cookies, sendMessage]);

  useEffect(() => {
    if (uData !== null) {
      //send message to getConversation
      sendMessage(
        JSON.stringify({ type: "getConversations", token: cookies.token })
      );
      sendMessage(
        JSON.stringify({ type: "subscribeChatUser", token: cookies.token })
      );
      // sendMessage(JSON.stringify({ type: "createDm", token: cookies.token, recipient: "rJAFQ2d6mUTgHHtLogPx5BB5NRT97ASFDy" }));
    }
  }, [uData]);

  useEffect(() => {
    if (conversations !== null) {
      //get chats of all the conversations
      const convoIds = conversations.map((convo) => convo.conversation_id);
      const uniqueConvoIds = [...new Set(convoIds)];
      console.log("Unique convo ids", uniqueConvoIds);
      sendMessage(
        JSON.stringify({
          type: "getMessages",
          token: cookies.token,
          conversation_ids: uniqueConvoIds,
        })
      );
    }
  }, [conversations]);

  // State to control the display of the third column
  const [showDetailsColumn, setShowDetailsColumn] = useState(false);

  const getQrCode = async (message) => {
    const rec = selectedUserHref.split('/')[2]
    const payload = await fetch('/api/xumm/createMicro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({destination: rec, memoStr: message, address: localStorage.getItem('address')})
    })
    const data = await payload.json();

    setQrCode(data.payload.refs.qr_png);
    setQrCodeUrl(data.payload.next.always);

    if (window.screen.width < 768) {
      //open in new tab
      window.open(data.payload.next.always, '_blank');
    }

    const ws = new WebSocket(data.payload.refs.websocket_status);

    ws.onmessage = async (e) => {
      let responseObj = JSON.parse(e.data)
      if (responseObj.signed !== null && responseObj.signed !== undefined) {
        const payload = await fetch(`/api/xumm/getpayload?payloadId=${responseObj.payload_uuidv4}`)
        const payloadJson = await payload.json()
        console.log(payloadJson)
      }
    }
  }

  const handleGem = (message) => {
    isInstalled().then((response) => {
      if (response.result.isInstalled) {
        const memoType = "XRPLDASH";
        const memoTypeHex = Buffer.from(memoType, "utf-8").toString("hex");
        const memoStrHex = Buffer.from(message, "utf-8").toString("hex");
        const payload = {
          amount: "1",
          destination: selectedUserHref.split("/")[2],
          memos: [
            {
              memo: {
                memoType: memoTypeHex,
                memoData: memoStrHex,
              },
            },
          ],
        };

        sendPayment(payload)
      }
    });
  };

  const handleSendMessage = () => {
    const inputValue = inputRef.current.value;
    if (!sendXrpl) {
      if (inputRef.current) {
        // const inputValue = inputRef.current.value;
        if (searchString === "") {
          sendMessage(
            JSON.stringify({
              type: "sendMessage",
              token: cookies.token,
              conversation_id: selectedMessage.conversation_id,
              content: inputRef.current.value,
            })
          );
        } else {
          sendMessage(
            JSON.stringify({
              type: "sendMessage",
              token: cookies.token,
              recipient: selectedMessage.id,
              content: inputRef.current.value,
            })
          );
        }
        inputRef.current.value = "";
      } else {
        console.log("Input ref is not yet available");
      }
    } else {
      if (inputRef.current) {
        const walletType = localStorage.getItem("walletType");
        if (walletType === "xumm") {
          getQrCode(inputValue);
          setShowModal(true);
        } else {
          handleGem(inputValue);
        }
      }
    }
  };

  const handlePreviewClick = (message) => {
    setSelectedMessage(message);
  };

  const handleClose = () => {
    setSelectedMessage(null);
  };

  useEffect(() => {
    if (searchString !== "") {
      const payload = {
        type: "searchUser",
        searchString: searchString,
      };
      sendMessage(JSON.stringify(payload));
    }
  }, [searchString]);

  useEffect(() => {
    if (!selectedMessage) return;
    if (!selectedMessage.userName) return;
    //get address form uname, getWalletFromUname
    sendMessage(
      JSON.stringify({
        type: "getWalletFromUname",
        username: selectedMessage.userName,
      })
    );

  }, [selectedMessage]);

  const closeModal = () => {
    setShowModal(false);
  };

  const FullMessage = ({
    userName,
    message,
    onClose,
    conversation_id,
    avatarUrl = undefined,
  }) => {
    return (
      <motion.div
        layout
        className="@container flex h-auto w-auto grow flex-col gap-8 overflow-y-auto rounded-2xl bg-[#21212A] p-4"
      >
        <motion.div
          layout
          className="sticky top-0 flex w-full justify-between "
        >
          <motion.div className="flex w-full items-center gap-4">
            {/* <motion.div className="rounded-full bg-default-avatar h-10 w-10 aspect-square" /> */}
            {avatarUrl !== "" || avatarUrl !== undefined ? (
              <AvatarInfoCard
                avatarUrl={avatarUrl}
                userName={userName}
                className="aspect-square rounded-full"
                href={selectedUserHref}
              />
            ) : (
              <motion.div
                layoutId={`avatar-${userName}`}
                className="bg-default-avatar aspect-square rounded-full"
              />
            )}
          </motion.div>
          <Button
            className="bg-transparent p-0"
            onClick={() => setShowDetailsColumn(!showDetailsColumn)}
          >
            <MoreHorizRoundedIcon />
          </Button>
        </motion.div>
        <div className="flex grow flex-col overflow-y-auto gap-4">
          {messages && messages.hasOwnProperty(conversation_id)
            ? messages[conversation_id].map((msg, index) => {
                return (
                  <ChatBox
                    key={index}
                    compactMode
                    timestamp={msg.created}
                    userName={msg.sender}
                    type={msg.sender_id === uData.uid ? "sent" : "received"}
                    messages={[msg.content]}
                  />
                );
              })
            : null}
        </div>
        <div className=" @md:flex-row flex w-full flex-col-reverse items-center gap-4">
          {/* <InputField placeholder="Type something..." className="bg-[#A6B0CF] bg-opacity-5 text-sm" sendIcon value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onClick={() => handleSendMessage(inputMessage)} /> */}
          <InputField
            placeholder="Type something..."
            className="bg-[#A6B0CF] bg-opacity-5 text-sm"
            // value={inputMessage}
            // onChange={(e) => setInputMessage(e.target.value)}
            onClick={() => handleSendMessage()}
            sendIcon
            reff={inputRef}
          />

          <div className="@md:w-auto flex w-full flex-col">
            <motion.div
              layout
              className="flex flex-row items-center justify-between gap-4"
            >
              <Tooltip
                tooltipContent="Enable it to send this message as a XRPL transaction."
                position="top-center"
                className="text-xs"
              >
                <span className="gradient-text flex w-auto gap-2 whitespace-nowrap text-sm">
                  Send with XRPL
                </span>
              </Tooltip>
              <Switch size="sm" onChange={() => setSendXrpl(!sendXrpl)} value={sendXrpl} />
            </motion.div>
            <div>
              <span className="flex w-auto gap-2 whitespace-nowrap text-xs opacity-40">
                Send as a XRPL transaction
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <AppLayout>
      <div className="flex h-[85vh] w-full gap-8 overflow-hidden">

        {/* MESSAGES LIST */}
        <div className="flex h-full  w-1/4 flex-col gap-8 overflow-y-scroll pt-4">
          <h1 className="text-2xl">Messages</h1>

          {/* SEARCH BAR */}
          <div className="relative">
            <SearchBar
              placeholder="Search by address or XRPLDash username"
              onChange={(e) => setSearchString(e.target.value)}
            />

            {searchResults && searchString !== "" && (
              <div className="absolute top-16 flex flex-col gap-2 bg-[#21212A] w-full p-4 rounded-2xl border border-[#fff] border-opacity-10 z-10 overflow-y-scroll min-w-60  max-h-96 left-0 bg-opacity-60 backdrop-blur-xl overflow-x-hidden overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((user, index) => (
                    <div key={index} className="p-2 flex w-full justify-between cursor-pointer items-center" onClick={() => handlePreviewClick(user)}>
                      <div className="flex gap-4 items-center w-full">
                        {user.pfp !== "" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={user.pfp}
                            alt={user.username}
                            className="rounded-full aspect-square"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="rounded-full bg-default-avatar h-10 w-10 aspect-square" />
                        )}
                        <span className="truncate text-sm font-semibold">{user.username}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm font-semibold opacity-40 text-center">No wallets found.</div>
                )}
              </div>
            )}

          </div>

          {/* PREVIEW MESSAGES */}
          <motion.div >
            {conversations &&
              conversations.map((message, index) => (
                <MessagePreview
                  key={index}
                  userName={message.userName}
                  messagePreview={message.messagePreview}
                  messageTimestamp={message.messageTimestamp}
                  unreadCount={message.unreadCount}
                  onClick={() => handlePreviewClick(message)}
                  isSelected={
                    selectedMessage &&
                    selectedMessage.userName === message.userName
                  }
                  avatarUrl={message.avatar}
                />
              ))}

          </motion.div>
        </div>

        {/* Full Message */}
        {selectedMessage && messages && searchString === "" && (
          <FullMessage
            userName={selectedMessage.userName}
            message={selectedMessage.messagePreview}
            onClose={handleClose}
            avatarUrl={selectedMessage.avatar}
            conversation_id={selectedMessage.conversation_id}
          />
        )}

        {selectedMessage && searchString !== "" && (
          <FullMessage
            userName={selectedMessage.username}
            message="Message this user..."
            onClose={handleClose}
            avatarUrl={selectedMessage.pfp}
            conversation_id={selectedMessage.id}
          />
        )}

        {/* Chat Details */}
        {showDetailsColumn && (
          <motion.div
            layout
            className="h-auto w-1/4 overflow-y-auto bg-transparent p-4"
          >
            <h1 className="text-2xl">Details</h1>
          </motion.div>
        )}
      </div>

      <TxModal showModal={showModal} closeModal={closeModal} qrCode={qrCode} qrCodeUrl={qrCodeUrl} text={'Send message with XRPL!'}/>

    </AppLayout>
  );
}
