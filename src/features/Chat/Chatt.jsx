
import * as React from 'react';
import {
  Box, Button, FormControl, FormLabel, Textarea, Input,
  IconButton, Menu, MenuItem, ListItemDecorator, Typography, Avatar
} from '@mui/joy';
import { Modal, ModalDialog, DialogTitle, DialogActions } from '@mui/joy';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, deleteMessage, updateMessage, clearMessages } from './chatSlice';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

export default function ChatComponent() {
  const [message, setMessage] = React.useState('');
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editIndex, setEditIndex] = React.useState(null);
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [emojiAnchor, setEmojiAnchor] = React.useState(null);
  const [emojiTargetIndex, setEmojiTargetIndex] = React.useState(null);
  const [replyTo, setReplyTo] = React.useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const textareaRef = React.useRef(null);
  const bottomRef = React.useRef(null);

  const dispatch = useDispatch();
  const messages = useSelector((state) => state.Chatt.messages);

  React.useEffect(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
      const msgs = JSON.parse(saved);
      msgs.forEach(msg => dispatch(addMessage(msg)));
    }
  }, [dispatch]);

  React.useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    const now = new Date();
    const dateOptions = { weekday: 'long', day: '2-digit', month: 'long' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    const styledMsg = {
      text: message,
      italic,
      fontWeight,
      timestamp: now.toLocaleTimeString('he-IL', timeOptions) + ' - ' + now.toLocaleDateString('he-IL', dateOptions),
      replyTo,
      sender: 'אתה',
    };

    if (editIndex !== null) {
      dispatch(updateMessage({ index: editIndex, newMessage: styledMsg }));
      setEditIndex(null);
    } else {
      dispatch(addMessage(styledMsg));
    }
    setMessage('');
    setItalic(false);
    setFontWeight('normal');
    setReplyTo(null);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('האם למחוק את כל ההודעות?')) {
      dispatch(clearMessages());
      localStorage.removeItem('chatMessages');
    }
  };

  const filteredMessages = messages.filter(msg =>
    msg.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ direction: 'rtl', p: 2, maxWidth: 700, margin: '0 auto' }}>
      <Typography level="h3" textAlign="center">צ'אט</Typography>

      <Input
        placeholder="🔍 חיפוש הודעות..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ my: 2, borderRadius: '12px', backgroundColor: '#f5f5f5' }}
      />

      <Button
        variant="outlined"
        color="danger"
        onClick={handleClearAll}
        sx={{ my: 2 }}
      >
        ניקוי כל הצ'אט
      </Button>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredMessages.map((msg, index) => {
          const isMyMessage = msg.sender === 'אתה';
          return (
            <Box
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                display: 'flex',
                flexDirection: isMyMessage ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
                <Avatar>
                  {msg.sender?.charAt(0) || '?'}
                </Avatar>
                <Typography level="body3" fontSize="10px" color="neutral" mt={0.5}>
                  {msg.sender}
                </Typography>
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  backgroundColor: '#FFF',
                  border: '1px solid #ccc',
                  borderRadius: '16px',
                  p: 2,
                  maxWidth: '70%',
                  boxShadow: hoveredIndex === index ? '0px 2px 8px rgba(0,0,0,0.2)' : 'none',
                  textAlign: 'right'
                }}
              >
                {hoveredIndex === index && (
                  <Box sx={{
                    position: 'absolute',
                    top: '-35px',
                    right: '8px',
                    display: 'flex',
                    gap: 1,
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    p: 0.5,
                    boxShadow: '0px 2px 6px rgba(0,0,0,0.15)'
                  }}>
                    <IconButton size="sm" color="primary" onClick={() => {
                      setMessage(msg.text);
                      setItalic(msg.italic);
                      setFontWeight(msg.fontWeight);
                      setEditIndex(index);
                      setTimeout(() => textareaRef.current?.focus(), 100);
                    }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="sm" color="warning" onClick={(e) => {
                      setEmojiAnchor(e.currentTarget);
                      setEmojiTargetIndex(index);
                      setShowEmojiPicker(true);
                    }}>
                      <EmojiEmotionsIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="sm" color="danger" onClick={() => setDeleteIndex(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="sm" color="neutral" onClick={() => setReplyTo(index)}>
                      <ReplyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}

                {msg.replyTo !== undefined && msg.replyTo !== null && messages[msg.replyTo] && (
                  <Box sx={{ fontSize: 'smaller', color: 'gray', mb: 1 }}>
                    ↪️ {messages[msg.replyTo]?.text.slice(0, 30)}...
                  </Box>
                )}

                <Typography
                  sx={{
                    fontStyle: msg.italic ? 'italic' : 'normal',
                    fontWeight: msg.fontWeight,
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </Typography>

                <Typography level="body3" textAlign="left" fontSize="xs" mt={0.5}>
                  {msg.timestamp}
                </Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={bottomRef} />
      </Box>

      <FormControl sx={{ mt: 3 }}>
        {replyTo !== null && (
          <Box sx={{ mb: 1, color: 'primary.main' }}>
            משיב ל: {messages[replyTo]?.text.slice(0, 30)}...
            <Button variant="plain" size="sm" onClick={() => setReplyTo(null)}>ביטול</Button>
          </Box>
        )}
        <FormLabel>ההודעה שלך</FormLabel>
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="הקלד כאן..."
          minRows={1}
          endDecorator={
            <Box sx={{ display: 'flex', gap: 1, pt: 1 }}>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <FormatBold />
                <KeyboardArrowDown fontSize="md" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                size="sm"
                placement="bottom-start"
              >
                {['200', 'normal', 'bold'].map((weight) => (
                  <MenuItem
                    key={weight}
                    selected={fontWeight === weight}
                    onClick={() => {
                      setFontWeight(weight);
                      setAnchorEl(null);
                    }}
                    sx={{ fontWeight: weight }}
                  >
                    <ListItemDecorator>
                      {fontWeight === weight && <Check fontSize="sm" />}
                    </ListItemDecorator>
                    {weight === '200' ? 'דק' : weight}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                variant={italic ? 'soft' : 'plain'}
                color={italic ? 'primary' : 'neutral'}
                onClick={() => setItalic(prev => !prev)}
              >
                <FormatItalic />
              </IconButton>
              <IconButton onClick={() => setShowEmojiPicker(prev => !prev)}>
                <EmojiEmotionsIcon />
              </IconButton>
              <Button sx={{ ml: 'auto' }} onClick={handleSend}>שלח</Button>
            </Box>
          }
          sx={{ minWidth: 300, fontWeight, fontStyle: italic ? 'italic' : 'normal' }}
        />
      </FormControl>

      <Modal open={deleteIndex !== null} onClose={() => setDeleteIndex(null)}>
        <ModalDialog>
          <DialogTitle>האם למחוק הודעה זו?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteIndex(null)}>ביטול</Button>
            <Button
              color="danger"
              onClick={() => {
                dispatch(deleteMessage(deleteIndex));
                setDeleteIndex(null);
              }}
            >
              מחק
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      {showEmojiPicker && (
        <Box sx={{ position: 'fixed', bottom: 120, right: 20, zIndex: 1300 }}>
          <Picker
            data={data}
            onEmojiSelect={(e) => {
              if (emojiTargetIndex !== null) {
                const updated = { ...messages[emojiTargetIndex] };
                updated.text += ` ${e.native}`;
                dispatch(updateMessage({ index: emojiTargetIndex, newMessage: updated }));
              } else {
                setMessage(prev => prev + ` ${e.native}`);
              }
              setShowEmojiPicker(false);
            }}
            locale="he"
            theme="light"
            searchPosition="top"
            previewPosition="none"
          />
        </Box>
      )}
    </Box>
  );
}
