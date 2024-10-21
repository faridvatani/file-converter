export type SiteConfig = typeof siteConfig;

export const prefix: string = process.env.NEXT_PUBLIC_BASE_PATH ?? '/';

export const siteConfig = {
  name: 'File Converter',
  description: 'Convert your files with ease.',
  creator: 'Farid Vatani',
  keywords:
    'free image convertor, image convertor, video convertor, audio convertor, unlimited image convertor, convertor',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About us',
      href: '/about-us',
    },
    {
      label: 'Contact us',
      href: '/contact-us',
    },
    {
      label: 'Privacy Policy',
      href: '/privacy-policy',
    },
  ],
  links: {
    github: 'https://github.com/',
    twitter: 'https://twitter.com/',
    discord: 'https://discord.gg/',
  },
};

export const aboutUsPageDescription: string = `
Effortlessly resize, crop, rotate, or convert image formats like JPEG, PNG, and more. Enhance your visuals in just a few clicks.

🎵 **Audio Transformation:**
Easily convert audio files between formats such as MP3, WAV, or AAC. Fine-tune your sound by adjusting bitrates, trimming, and merging tracks to craft the perfect audio experience.

🎥 **Video Metamorphosis:**
Edit and convert videos without limitations. Change formats, cut and merge clips, and create stunning videos tailored to your needs.

🚀 **Unlimited Usage, Completely Free:**
Convert as many files as you like—no hidden fees, no restrictions. Enjoy limitless access to powerful tools without spending a dime.

🌐 **Accessible Anywhere:**
Use File Converter from any device—computer, tablet, or smartphone. All you need is an internet connection to access the platform with ease.

🔒 **Secure and Private:**
Your files are handled with care. We prioritize your privacy and ensure that your multimedia content stays secure and private.

💡 **User-Friendly Interface:**
Designed for both beginners and experts, our intuitive interface makes the conversion process simple and straightforward.

📈 **Constantly Evolving:**
We’re always innovating. Expect regular updates and new features to keep your multimedia projects fresh and exciting.

🌟 **Free, Powerful, and Unlimited:**
Elevate your creative projects with the boundless potential of File Converter. Join a community of creators, professionals, and enthusiasts who are transforming their multimedia content. Get started today and unlock a world of possibilities!
`;

export const contactUsPageDescription: string = `
We’re here to help and appreciate your feedback! If you have any questions, concerns, or suggestions related to File Converter, the best way to reach us is by creating an issue on our GitHub repository: [File Converter](https://github.com/faridvatani/file-converter.)

Whether you're encountering a bug, have a feature request, or just want to share your thoughts on improving the project, leaving an issue on GitHub allows us to track and address your input efficiently.

By using GitHub Issues, we can prioritize and respond to your feedback faster, ensuring a smoother experience for everyone.

Thank you for helping us improve File Converter!
`;

export const privacyPolicyPageDescription: string = `
**Effective Date: Thu, Sep 5, 2024**

At File Converter, we are dedicated to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose personal information when you use our website and services. Please review this policy carefully to understand how we handle your data.

1. **Information We Collect**
   - We collect limited data through Analytics to enhance your user experience. This includes:
     - **Usage Information:** We may gather details about your interactions with our site, such as pages visited, IP address, browser type, device type, and referral URLs. This information helps us understand how users engage with our platform to improve its functionality.

2. **How We Use Your Information**
   - The data collected through Analytics is solely used to understand user behavior and optimize our website’s performance. We do not sell, rent, or share your information with third parties.

3. **Cookies and Tracking Technologies**
   - We use cookies and similar technologies to track your interactions with our website. You can manage cookie preferences through your browser settings, but note that disabling cookies may impact your site experience.

4. **Data Security**
   - We take reasonable precautions to protect your data from unauthorized access, disclosure, alteration, or destruction. However, please note that no data transmission over the internet or electronic storage is completely secure.

5. **Third-Party Links**
   - Our website may include links to third-party websites or services that are not operated by us. We have no control over the content, privacy policies, or practices of these third-party sites. We recommend reviewing their privacy policies before sharing any personal information.

6. **Children’s Privacy**
   - Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe your child has provided us with personal data, please contact us, and we will promptly delete that information.

7. **Changes to This Privacy Policy**
   - We may update this Privacy Policy at any time without prior notice. Any changes will take effect immediately upon being posted on this page. The date of the most recent revision will always be indicated at the top.

8. **Contact Us**
   - If you have any questions or concerns about this Privacy Policy or the data we collect, the best way to reach us is by creating an issue on our GitHub repository: **[File Converter](https://github.com/faridvatani/file-converter.)**.

By using File Converter, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue use of our services. Thank you for trusting us with your privacy.
`;

export const fileExtensions: Record<string, string[]> = {
  image: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'webp',
    'ico',
    'tif',
    'tiff',
    'svg',
    'raw',
    'tga',
  ],
  video: [
    'mp4',
    'm4v',
    'mp4v',
    '3gp',
    '3g2',
    'avi',
    'mov',
    'wmv',
    'mkv',
    'flv',
    'ogv',
    'webm',
    'h264',
    '264',
    'hevc',
    '265',
  ],
  audio: ['mp3', 'wav', 'ogg', 'aac', 'wma', 'flac', 'm4a'],
};
