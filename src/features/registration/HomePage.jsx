// קוד עם העיצוב החדש
import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, TextField, IconButton } from "@mui/material";
import { Email, LocationOn, Phone, Edit } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";



// מספרים מרצדים
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // זמן האנימציה במילישניות
    const increment = value / (duration / 16);

    const animate = () => {
      setCount((prev) => {
        const nextValue = prev + increment;
        return nextValue < value ? nextValue : value;
      });

      if (count < value) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <h3>{Math.floor(count).toLocaleString()}</h3>;
};
//*

export default function HomePage() {

  //התמונות בגלגלת
  const imagess = [
    { src: "/images/1.jpg" },
    { src: "/images/mobail.jpg" },
    { src: "/images/nura.jpg" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagess.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imagess.length - 1 ? 0 : prev + 1));
  };
  //*

  // מספרים מרצדים
  const data = [
    { number: 347, text: "מערך\nמסגרות למידה" },
    { number: 12000, text: "משתתפים במגוון\nמסגרות למידה" },
    { number: 133, text: "סדנאות חדרי מורים\nוימי עיון" },
    { number: 250, text: "סימולציות" },
  ];

  // כותרת זזה
  const [isAdmin, setIsAdmin] = useState(true);

  //כותרות בצדדים
  const [titles, setTitles] = useState({
    about: "אודותינו",
    findUs: "מה תמצאו אצלינו?",
    suitableFor: "למי זה מתאים?",
    contactUs: "צור קשר"
  });
  //*

  //תמונות בדף הבית
  const [images, setImages] = useState({
    main: "./images/open2.jpg",
    first: "./images/globus.jpg",
    second: "./images/3.jpg",
    third: "./images/4.jpg",
    fourth: "./images/5.jpg",
    arrow: "./images/globus.jpg"
  });
  //*

  const [editingTitle, setEditingTitle] = useState(null);

  const handleTitleChange = (key, value) => {
    setTitles((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (key, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => ({ ...prev, [key]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  //ברוכים הבאים
  const [editing, setEditing] = useState(false);
  const [welcomeText, setWelcomeText] = useState(
    "ברוכים הבאים למרכז השתלמויות הפלטפורמה המובילה להשתלמויות מקצועיות והתפתחות אישית! אנו מאמינים שלמידה מתמשכת היא המפתח להצלחה, ולכן יצרנו עבורכם מרחב דיגיטלי מתקדם המציע מגוון השתלמויות איכותיות במגוון תחומים. באתר שלנו תמצאו קורסים והדרכות ממומחים מובילים, המותאמים לאנשי מקצוע המעוניינים להרחיב את הידע שלהם ולהתקדם בקריירה."
  );
  //*

  //מה תמצאו אצלינו
  //תמונות עיגולים
  const [imagesCircle, setImagesCircle] = useState([
    { text: "תכנים פרקטיים\nליישום מידי", img: "../images/nura.jpg" },
    { text: "השתלמויות עדכניות\nבמגוון תחומים", img: "./images/globus.jpg" },
    { text: "הדרכת מומחים\nבעלי ניסיון רב", img: "./images/men.png" },
    { text: "חווית למידה גמישה\nבכל זמן ומכל מקום", img: "./images/mobail.jpg" }
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [newText, setNewText] = useState("");

  const handleImageCircleChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedImages = [...imagesCircle];
        updatedImages[index].img = e.target.result;
        setImagesCircle(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (index, e) => {
    const updatedImages = [...imagesCircle];
    updatedImages[index].text = e.target.value;
    setImagesCircle(updatedImages);
  };
  //*

  //למי זה מתאים
  const [editingg, setEditingg] = useState(false);
  const [appropriateText, setappropriateText] = useState(
    "  בין אם אתם מחפשים להתמקצע בתחום חדש, לרענן את הידע הקיים או לשדרג את הכישורים שלכם – אנחנו כאן כדי לסייע לכם להשיג את היעדים שלכם. הצטרפו אלינו עוד היום והתחילו ללמוד, להתפתח ולהצליח! 🚀"
  );
  //*

  //צור קשר
  const [contactUs, setcontactUs] = useState({
    address: "הסתדרות המורים, רח' ארלוזורוב 92, חיפה.",
    phone: "04-8660168",
    email: "Course-hi@morimaguda.co.il",
  });
  const [buttonText, setButtonText] = useState("לפרטים נוספים ולהרשמה לחץ כאן");

  const navigate = useNavigate();

  const handleFormClick = () => {
    navigate(`/ContactPage/`);
  };

  const handleRegisterClick = () => {
    navigate(`/RegistrationTable/`);
  };

  return (

    <Box>
      {/* {isAdmin && <Button onClick={() => setIsAdmin(false)}>צא ממצב עריכה</Button>} */}

      <div className="carousel-container">
        <div className="carousel-slide">
          <div className="imagess">
            <img src={imagess[currentIndex].src} alt={imagess[currentIndex].caption} />
            <div className="caption">{imagess[currentIndex].caption}</div>
          </div>

          {/* חיצים לניווט */}
          <div className="arrow arrow-left" onClick={prevSlide}>&#10094;</div>
          <div className="arrow arrow-right" onClick={nextSlide}>&#10095;</div>

          <div className="overlay-box">
            <h2>מעלות בית יעקב</h2>
            <p>מרכז הכשרה והשתלמויות</p>
          </div>
        </div>
      </div>

      <div className="numbers-container">
        {data.map((item, index) => (
          <div key={index} className="number-item">
            <Counter value={item.number} />
            <p dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br>') }} />
          </div>
        ))}
      </div>

      {/* כותרת אודותינו */}
      <Box
        bgcolor="#000000"
        borderRadius="50px 0px 0px 50px"
        paddingY={0.5}
        paddingX={12}
        width={350}
        marginBottom={4}
        marginTop={16}
        display="flex"
        textAlign="right"
        marginLeft="23">
        {isAdmin && editingTitle === "about" ? (
          <TextField
            value={titles.about}
            onChange={(e) => handleTitleChange("about", e.target.value)}
            fullWidth
            onBlur={() => setEditingTitle(null)}
            autoFocus
            sx={{
              input: { color: "white" }, // צבע הטקסט 
              "& .MuiInputBase-input": { color: "white" }, // תוספת כדי לוודא שהטקסט יהיה לבן תמיד
            }}
          />
        ) : (
          <Typography variant="h6" color="white">{titles.about}</Typography>
        )}
        {isAdmin && <IconButton onClick={() => setEditingTitle("about")}><Edit sx={{ color: "white" }} /></IconButton>}
      </Box>

      {/* מקטע ראשון */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={2}>
        <Paper sx={{ padding: 9, maxWidth: 600, boxShadow: "none" }}>
          {editing ? (
            <TextField
              value={welcomeText}
              onChange={(e) => setWelcomeText(e.target.value)}
              fullWidth
              multiline
              minRows={3} // מבטיח מינימום שורות
              maxRows={10} // מונע גודל מוגזם
              onBlur={() => setEditing(false)}
              autoFocus
            />
          ) : (
            <Typography variant="h6">{welcomeText}</Typography>
          )}
          {isAdmin && < IconButton onClick={() => setEditing(true)}>
            <Edit sx={{ color: "black" }} />
          </IconButton>}
        </Paper>

        {/* תמונה אודותינו */}
        <Box
          width={400}
          height={400}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
          marginLeft={4}>
          <img src={images.first} alt="תיאור התמונה" style={{ width: '100%', maxWidth: 300 }} />
          {isAdmin && <input
            type="file"
            onChange={(e) => handleImageChange("first", e)}
            style={{ display: 'block' }}
          />}
        </Box>
      </Box>


      {/* כותרת מה תמצאו אצלינו? */}
      <Box
        bgcolor="#000000"
        borderRadius="50px 0px 0px 50px"
        paddingY={0.5}
        paddingX={12}
        width={350}
        marginBottom={4}
        marginTop={8}
        display="flex"
        textAlign="right"
        marginLeft="23">
        {isAdmin && editingTitle === "findUs" ? (
          <TextField
            value={titles.findUs}
            onChange={(e) => handleTitleChange("findUs", e.target.value)}
            fullWidth
            onBlur={() => setEditingTitle(null)}
            autoFocus
            sx={{
              input: { color: "white" }, // צבע הטקסט 
              "& .MuiInputBase-input": { color: "white" }, // תוספת כדי לוודא שהטקסט יהיה לבן תמיד
            }} />
        ) : (
          <Typography variant="h6" color="white">{titles.findUs}</Typography>
        )}
        {isAdmin && <IconButton onClick={() => setEditingTitle("findUs")}><Edit sx={{ color: "white" }} /></IconButton>}
      </Box>

      {/* עיגולי תמונה */}
      <Box marginTop='80px' display="flex" justifyContent="center" gap={0} padding={4} flexWrap="wrap">
        {imagesCircle.map((item, index) => (
          <Box key={index} display="flex" flexDirection="column" alignItems="center" textAlign="center" width={{ xs: 200, sm: 250, md: 300 }}>
            <Box
              width={150}
              height={150}
              borderRadius="50%"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom={2}
            >
              <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>

            {isAdmin && editingIndex === index ? (
              <>
                <input type="file" onChange={(e) => handleImageCircleChange(index, e)} />
                <TextField
                  value={newText || item.text}
                  onChange={(e) => {
                    setNewText(e.target.value);
                    handleTextChange(index, e);
                  }}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="ערוך כיתוב"
                  autoFocus
                />
              </>
            ) : (
              <Typography variant="body1" whiteSpace="pre-line">{item.text}</Typography>
            )}

            {isAdmin && editingIndex === index ? (
              <IconButton onClick={() => setEditingIndex(null)}>
                <Edit sx={{ color: "red" }} />
              </IconButton>
            ) : (
              isAdmin && (
                <IconButton onClick={() => {
                  setEditingIndex(index);
                  setNewText(item.text); // להוסיף את הכיתוב הנוכחי למצב העריכה
                }}>
                  <Edit sx={{ color: "black" }} />
                </IconButton>
              )
            )}
          </Box>
        ))}
      </Box>


      {/* כותרת למי זה מתאים? */}
      <Box
        bgcolor="#000000"
        borderRadius="50px 0px 0px 50px"
        paddingY={0.5}
        paddingX={12}
        width={350}
        marginBottom={4}
        marginTop={8}
        display="flex"
        textAlign="right"
        marginLeft="23">
        {isAdmin && editingTitle === "suitableFor" ? (
          <TextField
            value={titles.suitableFor}
            onChange={(e) => handleTitleChange("suitableFor", e.target.value)}
            fullWidth onBlur={() => setEditingTitle(null)}
            autoFocus
            sx={{
              input: { color: "white" }, // צבע הטקסט 
              "& .MuiInputBase-input": { color: "white" }, // תוספת כדי לוודא שהטקסט יהיה לבן תמיד
            }} />
        ) : (
          <Typography variant="h6" color="white">{titles.suitableFor}</Typography>
        )}
        {isAdmin && <IconButton onClick={() => setEditingTitle("suitableFor")}><Edit sx={{ color: "white" }} /></IconButton>}
      </Box>

      {/* מקטע שני */}
      <Box display="flex" alignItems="center" justifyContent="center" padding={2}>
        <Box width={400} height={400} display="flex" alignItems="center" justifyContent="center" borderRadius={2} marginLeft={4}>
          <img src={images.second} alt="תיאור התמונה" style={{ width: '100%', maxWidth: 300 }} />
          {isAdmin && <input
            type="file"
            onChange={(e) => handleImageChange("second", e)}
            style={{ display: 'block' }}
          />}
        </Box>

        <Paper sx={{ padding: 9, maxWidth: 600, boxShadow: "none" }}>
          {isAdmin && editingg ? (
            <TextField
              value={appropriateText}
              onChange={(e) => setappropriateText(e.target.value)}
              fullWidth
              multiline
              minRows={3} // מבטיח מינימום שורות
              maxRows={10} // מונע גודל מוגזם
              onBlur={() => setEditingg(false)}
              autoFocus
            />
          ) : (
            <Typography variant="h6">{appropriateText}</Typography>
          )}
          {isAdmin && <IconButton onClick={() => setEditingg(true)}>
            <Edit sx={{ color: "black" }} />
          </IconButton>}
        </Paper>
      </Box>


      {/* כותרת צור קשר */}
      <Box
        bgcolor="#000000"
        borderRadius="50px 0px 0px 50px"
        paddingY={0.5}
        paddingX={12}
        width={350}
        marginBottom={4}
        display="flex"
        textAlign="right"
        marginLeft="23">
        {isAdmin && editingTitle === "contactUs" ? (
          <TextField
            value={titles.contactUs}
            onChange={(e) => handleTitleChange("contactUs", e.target.value)}
            fullWidth onBlur={() => setEditingTitle(null)}
            autoFocus
            sx={{
              input: { color: "white" }, // צבע הטקסט 
              "& .MuiInputBase-input": { color: "white" }, // תוספת כדי לוודא שהטקסט יהיה לבן תמיד
            }} />
        ) : (
          <Typography variant="h6" color="white">{titles.contactUs}</Typography>
        )}
        {isAdmin && <IconButton onClick={() => setEditingTitle("contactUs")}><Edit sx={{ color: "white" }} /></IconButton>}
      </Box>


      <Box display="flex" alignItems="center" justifyContent="center" padding={6}>
        <Paper sx={{ padding: 3, maxWidth: 600, boxShadow: "none" }}>
          {/* כתובת */}
          {isAdmin && editingTitle === "address" ? (
            <TextField
              value={contactUs.address}
              onChange={(e) => setcontactUs({ ...contactUs, address: e.target.value })}
              fullWidth
              onBlur={() => setEditingTitle(null)} // כאן צריך לשים setEditingTitle(null)
              autoFocus
            />
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                <LocationOn sx={{ verticalAlign: "middle", marginLeft: 1 }} /> כתובת
              </Typography>
              <Typography>{contactUs.address}</Typography>
            </>
          )}
          {isAdmin && <IconButton onClick={() => setEditingTitle("address")}><Edit sx={{ color: "black" }} /></IconButton>}

          {/* טלפון */}
          {isAdmin && editingTitle === "phone" ? (
            <TextField
              value={contactUs.phone}
              onChange={(e) => setcontactUs({ ...contactUs, phone: e.target.value })}
              fullWidth
              onBlur={() => setEditingTitle(null)} // כאן גם צריך לשים setEditingTitle(null)
              autoFocus
            />
          ) : (
            <>
              <Typography variant="h6" gutterBottom marginTop={2}>
                <Phone sx={{ verticalAlign: "middle", marginLeft: 1 }} /> טלפון
              </Typography>
              <Typography>
                <a href={`tel:${contactUs.phone}`} underline="none" color="inherit">{contactUs.phone}</a>
              </Typography>
            </>
          )}
          {isAdmin && <IconButton onClick={() => setEditingTitle("phone")}><Edit sx={{ color: "black" }} /></IconButton>}

          {/* מייל */}
          {isAdmin && editingTitle === "email" ? (
            <TextField
              value={contactUs.email}
              onChange={(e) => setcontactUs({ ...contactUs, email: e.target.value })}
              fullWidth
              onBlur={() => setEditingTitle(null)} // ושוב, setEditingTitle(null)
              autoFocus
            />
          ) : (
            <>
              <Typography variant="h6" gutterBottom marginTop={2}>
                <Email sx={{ verticalAlign: "middle", marginLeft: 1 }} /> מייל
              </Typography>
              <Typography>
                <a href={`mailto:${contactUs.email}`} underline="none" color="inherit">{contactUs.email}</a>
              </Typography>
            </>
          )}
          {isAdmin && <IconButton onClick={() => setEditingTitle("email")}><Edit sx={{ color: "black" }} /></IconButton>}
        </Paper>

        <Box
          display="flex"
          flexDirection="column" // מגדיר שהאלמנטים יהיו אחד מתחת לשני
          alignItems="center"
          justifyContent="center"
          gap={2} // רווח בין הכפתורים
        >
          <Button
            onClick={handleFormClick} // קריאה לפונקציה שמבצעת ניווט
            variant="contained"
            color="inherit"
            sx={{ color: "white", bgcolor: "#000000", height: 150, width: 250 }}
          >
            {buttonText}
          </Button>

          {/* צפייה בנרשמים */}
          {isAdmin && (
            <Button
              onClick={handleRegisterClick} // קריאה לפונקציה שמבצעת ניווט
              variant="contained"
              color="inherit"
              sx={{ color: "white", bgcolor: "#000000", height: 150, width: 250 }}
            >
              צפייה בנרשמים
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
