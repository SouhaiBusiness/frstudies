module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()'
          },
          {
            key: 'X-Robots-Tag',
            value: 'all'
          }
        ]
      }
    ];
  }
};