import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';
// components
import Image from '../../../components/Image';
import useAuth from 'src/hooks/useAuth';
import createAvatar from 'src/utils/createAvatar';
import useChat from 'src/hooks/useChat';

// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

ChatMessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired,
  onOpenLightbox: PropTypes.func,
};

export default function ChatMessageItem({ message, conversation, onOpenLightbox }) {
const {user} = useAuth();
const {participants} = useChat();
const [msgContent,setMessageContent] = useState(message.message)
  const sender = participants?.find((participant) => participant.id === message.senderId);
  const senderDetails =
    message.senderId === user._id
      ? { type: 'me' }
      : { avatar: sender?.avatar, name: sender?.name };

  const isMe = sender.type === 'me';
  const isImage = message.contentType === 'image';
  const firstName = senderDetails.name;

  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto',
          }),
        }}
      >

        {senderDetails.type !== 'me' && (
          <Avatar src="/images/avatars/brain.png" alt={senderDetails.name} sx={{ width: 32, height: 32, mr: 2 }}>
            </Avatar>
        )}

        <div>
          <InfoStyle
            variant="caption"
            sx={{
              ...(isMe && { justifyContent: 'flex-end' }),
            }}
          >
            {!isMe && `${firstName},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </InfoStyle>

          <ContentStyle
            sx={{
              ...(isMe && { color: 'grey.800', bgcolor: 'primary.lighter' }),
              ...(isImage && { p: 0 }),
            }}
          >
            {isImage ? (
              <Image
                alt="attachment"
                src={message.body}
                onClick={() => onOpenLightbox(message.body)}
                sx={{ borderRadius: 1, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
              />
            ) : (
              <Typography variant="body2">{
                typeof(msgContent)=== 'object'?
                msgContent.map((mes) => {
                  let msg= "- "
                  for (const [key, value] of Object.entries(mes)) {
                   if(!key.includes("id")) 
                   msg+= `\n ${key}: ${value} `;
                  }
                  return msg
                  ;
                })                :
                msgContent
                
                }</Typography>
            )}
          </ContentStyle>
        </div>
      </Box>
    </RootStyle>
  );
}
