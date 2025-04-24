import * as React from 'react';
import {
  Box, Button, FormControl, FormLabel, Textarea,
  IconButton, Menu, MenuItem, ListItemDecorator, Typography
} from '@mui/joy';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, deleteMessages, updateMessage } from './chatSlice';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ChatComponent() {
  const [message, setMessage] = React.useState('');
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editIndex, setEditIndex] = React.useState(null);
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
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    const styledMsg = {
      text: message,
      italic,
      fontWeight,
      timestamp: new Date().toLocaleString('he-IL'), // הוספת תאריך
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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ direction: 'rtl', p: 2, maxWidth: 600, margin: '0 auto' }}>
      <Typography level="h3">צ'אט</Typography>


      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 2 }}>
        {messages.map((msg, index) => (

          <Box
            key={index}
            sx={{
              alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'me' ? '#DCF8C6' : '#FFF',
              border: '1px solid #ccc',
              borderRadius: '16px',
              p: 1.5,
              maxWidth: '75%',
              cursor: 'pointer'
            }}
            onClick={() => {
              setMessage(msg.text);
              setItalic(msg.italic);
              setFontWeight(msg.fontWeight);
              setEditIndex(index);
            }}

          >

            <Typography
              sx={{
                fontStyle: msg.italic ? 'italic' : 'normal',
                fontWeight: msg.fontWeight,
                wordBreak: 'break-word'
              }}
            >
              <DeleteIcon fontSize="xs" /> 🖋️
              {msg.text}
            </Typography>
            <Typography level="body3" textAlign="left" fontSize="xs" mt={0.5}>
              {msg.timestamp}
              {/* לא לשכוח - שניות */}
            </Typography>

          </Box>
        ))}
      </Box>

      <FormControl>
        <FormLabel>ההודעה שלך</FormLabel>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="הקלד כאן..."
          minRows={1}
          endDecorator={
            <Box
            // sx={{
            //   display: 'flex',
            //   gap: 'var(--Textarea-paddingBlock)',
            //   pt: 'var(--Textarea-paddingBlock)',
            //   borderTop: '1px solid',
            //   borderColor: 'divider',
            //   flex: 'auto'
            // }}
            >
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
                onClick={() => setItalic((prev) => !prev)}
              >
                <FormatItalic />
              </IconButton>
              <Button sx={{ ml: 'auto' }} onClick={handleSend}>שלח</Button>
            </Box>
          }
          sx={{ minWidth: 300, fontWeight, fontStyle: italic ? 'italic' : 'normal' }}
        />
      </FormControl>
    </Box>
  );
}
