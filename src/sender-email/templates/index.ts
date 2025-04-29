const recoverPassword = (userId: string, token: string) => {
  const resetLink = `${process.env.URI}auth/${userId}/verify/${token}`;
  return `<div>
  <h2>Password Reset</h2>
  <p>We received a request to reset the password for your account. If you did not make this request, you can safely ignore this email.</p>
  <p>To proceed with resetting your password, please click the button below:</p>
  <a href="${resetLink}">Reset Password</a>
  <p>This link will expire in 1 hour for security reasons.</p>
  <p>If you have problems with the link copy and paste the following link in your browser: ${resetLink}</p>
</div>`;
};

const sendEmailTest = () => {
  return 'Testing send email';
};

export const mailTemplates = Object.freeze({
  RECOVER_PASSWORD: recoverPassword,
  SEND_EMAIL_TEST: sendEmailTest,
});
