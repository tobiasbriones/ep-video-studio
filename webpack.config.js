module.exports = env => {
  let mode = env;

  if (env !== 'dev' && env !== 'prod') {
    mode = 'prod';
    const msg = `
      Invalid build argument env: ${env}, use 'dev' or 'prod' only.
      Using 'prod' production mode by default.
    `;

    console.log(msg);
  }
  return require(`./webpack/webpack.config.${mode}`);
};
