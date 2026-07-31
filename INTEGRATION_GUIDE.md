# ZENNARA Website Integration Guide

This guide covers the remaining integrations needed to launch the ZENNARA website.

---

## ✅ COMPLETED

1. ✅ All 8 pages built with full content
2. ✅ Light theme CSS implemented
3. ✅ All logos integrated (navigation, hero, footer, favicon)
4. ✅ JavaScript functionality complete (zenara-custom.js)
5. ✅ Coming soon page created

---

## 📋 REMAINING INTEGRATIONS

### 1. Contact Form Backend Integration

**Status:** ⏳ Needs Implementation

**Current State:**
- Frontend form validation complete
- Form data collection working
- Temporary success messages showing

**To Implement:**

#### Option A: PHP Backend (Recommended for shared hosting)

Create `api/contact.php`:

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

// Get form data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    exit(json_encode(['error' => 'Required fields missing']));
}

// Sanitize inputs
$firstName = htmlspecialchars($data['firstName']);
$lastName = htmlspecialchars($data['lastName']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($data['phone']);
$country = htmlspecialchars($data['country']);
$service = htmlspecialchars($data['service']);
$propertyType = htmlspecialchars($data['propertyType']);
$message = htmlspecialchars($data['message']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Invalid email address']));
}

// Email configuration
$to = 'info@zennarafp.com';
$subject = 'New Contact Form Submission - ZENNARA Website';

// Email body
$emailBody = "
New contact form submission from ZENNARA website

Name: $firstName $lastName
Email: $email
Phone: $phone
Country: $country
Service Interest: $service
Property Type: $propertyType

Message:
$message

---
Submitted: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $emailBody, $headers)) {
    // Save to database (optional)
    // saveToDatabase($data);
    
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
```

#### Update JavaScript (assets/js/zenara-custom.js)

Replace the TODO section in `initContactForm()` with:

```javascript
$.ajax({
    url: '/api/contact.php',
    method: 'POST',
    data: JSON.stringify(formData),
    contentType: 'application/json',
    success: function(response) {
        showFormMessage('success', 'Thank you! We\'ll get back to you within 24 hours.');
        contactForm[0].reset();
    },
    error: function(xhr, status, error) {
        showFormMessage('error', 'Something went wrong. Please try again or contact us directly at info@zennarafp.com');
    },
    complete: function() {
        submitBtn.prop('disabled', false).text(originalText);
    }
});
```

#### Option B: Third-Party Form Services (Easiest)

**Recommended Services:**
1. **Formspree** (https://formspree.io)
   - Free tier: 50 submissions/month
   - Simple integration
   - Spam protection included

2. **Basin** (https://usebasin.com)
   - Free tier: 100 submissions/month
   - Good spam filtering

3. **Netlify Forms** (if hosting on Netlify)
   - Included with hosting
   - Simple HTML attribute: `netlify`

**Formspree Example:**

```html
<!-- Update form tag in zenara-contact.html -->
<form 
    id="contactForm" 
    class="zenara-form"
    action="https://formspree.io/f/YOUR_FORM_ID"
    method="POST"
>
    <!-- Keep existing fields -->
</form>
```

---

### 2. Google Maps Integration

**Status:** ⏳ Needs Implementation

**Current State:**
- Map placeholder div ready in zenara-contact.html
- Section styled and positioned

**To Implement:**

#### Step 1: Get Google Maps API Key

1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable "Maps JavaScript API"
4. Create credentials (API Key)
5. Restrict key to your domain (zennarafp.com)

#### Step 2: Add Script to Contact Page

Add before closing `</body>` tag in `zenara-contact.html`:

```html
<!-- Google Maps -->
<script>
    function initMap() {
        // Nairobi, Kenya coordinates (update with exact office location)
        const zenaraOffice = { lat: -1.2864, lng: 36.8172 };
        
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: zenaraOffice,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#e9e9e9"}]
                }
            ]
        });
        
        const marker = new google.maps.Marker({
            position: zenaraOffice,
            map: map,
            title: 'ZENNARA LTD',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#B8860B',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
            }
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: '<div style="padding:10px;"><strong>ZENNARA LTD</strong><br>Nairobi, Kenya</div>'
        });
        
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
</script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
</script>
```

#### Step 3: Update Map Container

Replace the map-placeholder div in zenara-contact.html:

```html
<div class="map-wrapper">
    <div id="map" style="width: 100%; height: 450px;"></div>
</div>
```

#### Alternative: Embed Map (No API Key Required)

```html
<div class="map-wrapper">
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8195!2d36.8172!3d-1.2864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMTEuMCJTIDM2wrA0OScwMi4wIkU!5e0!3m2!1sen!2ske!4v1234567890"
        width="100%" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
    </iframe>
</div>
```

---

### 3. Analytics Setup

**Status:** ⏳ Needs Implementation

#### Option A: Google Analytics 4 (Recommended)

**Step 1: Create GA4 Property**

1. Go to https://analytics.google.com
2. Create account/property for zennarafp.com
3. Get Measurement ID (G-XXXXXXXXXX)

**Step 2: Add Tracking Code**

Add to `<head>` section of ALL pages (or use tag manager):

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
    });
</script>
```

**Step 3: Event Tracking**

Update TODO sections in `zenara-custom.js`:

```javascript
// WhatsApp Click Tracking
$(document).on('click', 'a[href^="https://wa.me"]', function() {
    gtag('event', 'whatsapp_click', {
        'event_category': 'engagement',
        'event_label': 'WhatsApp Contact'
    });
});

// Form Submission Tracking
function trackFormSubmission(formName) {
    gtag('event', 'form_submission', {
        'event_category': 'lead',
        'event_label': formName
    });
}
```

#### Option B: Plausible Analytics (Privacy-Friendly Alternative)

**Benefits:**
- No cookie banner needed (GDPR compliant)
- Simple, clean interface
- Lightweight (< 1KB script)
- Privacy-focused

**Setup:**

1. Go to https://plausible.io
2. Add site: zennarafp.com
3. Add script to all pages:

```html
<script defer data-domain="zennarafp.com" src="https://plausible.io/js/script.js"></script>
```

**Custom Events:**

```javascript
plausible('Form Submission', {props: {form: 'contact'}});
plausible('WhatsApp Click');
```

---

### 4. Email Configuration

**Status:** ⏳ Needs Setup

**Domain Email: info@zennarafp.com**

#### Setup Options:

**Option A: Google Workspace (Recommended)**
- Cost: $6/user/month
- Professional email: info@zennarafp.com
- 30GB storage
- Google Drive, Calendar, Meet included
- Setup: https://workspace.google.com

**Option B: Microsoft 365**
- Cost: $6/user/month
- Professional email with Outlook
- OneDrive, Teams included
- Setup: https://microsoft.com/microsoft-365

**Option C: Hosting Provider Email**
- Usually included with hosting
- Check with your hosting provider
- Configure SMTP for form submissions

#### SMTP Settings for Contact Form

Once email is configured, update contact form backend:

```php
// PHP Mailer example
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com'; // or your SMTP server
$mail->SMTPAuth = true;
$mail->Username = 'info@zennarafp.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
```

---

### 5. Newsletter Integration

**Status:** ⏳ Needs Implementation

**Recommended Services:**

#### Option A: Mailchimp (Most Popular)
- Free tier: 500 contacts
- Setup: https://mailchimp.com
- Get API key and audience ID
- Update newsletter form:

```javascript
$.ajax({
    url: '/api/mailchimp-subscribe.php',
    method: 'POST',
    data: JSON.stringify({ email: email }),
    contentType: 'application/json',
    success: function(response) {
        alert('Thank you for subscribing!');
    }
});
```

#### Option B: ConvertKit
- Creator-focused
- Better automation
- Cost: $9/month for 300 subscribers

#### Option C: SendGrid
- Developer-friendly
- Free tier: 100 emails/day
- Good deliverability

---

### 6. Security & Performance

#### A. SSL Certificate

**Required for production**

```bash
# If using Let's Encrypt (free)
certbot --nginx -d zennarafp.com -d www.zennarafp.com
```

#### B. Content Security Policy

Add to all pages `<head>`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://maps.googleapis.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src 'self' https://fonts.gstatic.com;
               img-src 'self' data: https:;
               connect-src 'self' https://www.google-analytics.com;">
```

#### C. Performance Optimization

```bash
# Minify CSS
npx cssnano assets/css/zenara-custom.css assets/css/zenara-custom.min.css

# Minify JavaScript
npx terser assets/js/zenara-custom.js -o assets/js/zenara-custom.min.js
```

Update references in HTML:

```html
<link href="assets/css/zenara-custom.min.css" rel="stylesheet">
<script src="assets/js/zenara-custom.min.js"></script>
```

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Launch Testing

- [ ] Test all forms on different devices
- [ ] Verify all internal links work
- [ ] Check all external links (email, phone, WhatsApp)
- [ ] Test mobile responsiveness (360px - 1920px)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Page load speed test (Lighthouse score 90+)
- [ ] Accessibility test (WCAG AA)
- [ ] Spell check all content
- [ ] Test contact form submissions
- [ ] Verify newsletter signup works
- [ ] Check Google Maps display correctly
- [ ] Test analytics tracking
- [ ] Verify all logos display correctly
- [ ] Check favicon in all browsers

### DNS Configuration

```
A Record:  @ → Your Server IP
CNAME:     www → zennarafp.com
MX Record: For email (depends on email provider)
TXT:       SPF record for email authentication
```

### Hosting Recommendations

**Option A: Netlify (Easiest)**
- Free SSL
- Automatic deployments from Git
- Form handling included
- CDN included
- Command: `netlify deploy --prod`

**Option B: Vercel**
- Similar to Netlify
- Great performance
- Free SSL and CDN

**Option C: Traditional Hosting**
- Hostinger, SiteGround, etc.
- Upload via FTP/SFTP
- Configure SSL manually

---

## 📊 TIMELINE ESTIMATE

| Task | Time Estimate |
|------|---------------|
| Contact form backend | 2-4 hours |
| Google Maps integration | 1-2 hours |
| Analytics setup | 1 hour |
| Email configuration | 2-3 hours |
| Newsletter integration | 2-3 hours |
| Testing (cross-browser, mobile) | 4-6 hours |
| Performance optimization | 2-3 hours |
| Deployment & DNS setup | 2-4 hours |
| **TOTAL** | **16-26 hours** |

---

## 🆘 SUPPORT CONTACTS

**Development Questions:**
- Email: info@zennarafp.com
- Phone: +254 789 115737

**Hosting Support:**
- Check with your hosting provider

**Domain Support:**
- Check with your domain registrar

---

## ✅ QUICK START FOR LAUNCH

**Minimum Viable Launch (Can go live with):**
1. ✅ All pages complete (DONE)
2. ✅ Logos integrated (DONE)
3. ✅ JavaScript functionality (DONE)
4. ⏳ Contact form backend
5. ⏳ SSL certificate
6. ⏳ Analytics

**Can Add Post-Launch:**
- Google Maps (use placeholder text temporarily)
- Newsletter integration (collect emails manually)
- Advanced analytics events

---

**Next Action:** Choose your hosting provider and start with contact form backend integration using the PHP example above or Formspree for quickest launch.
