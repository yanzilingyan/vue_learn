var version = '0.1.0';

Package.describe({
  name: 'pagination',
  summary: 'An asynchronous paging component based on vue2.0 or more.',
  version: version,
  git: 'https://github.com/yanzilingyan/vue.git'
});

Package.onUse(function (api) {
  api.versionsFrom('0.1.0.0');

  api.addFiles([
    'dist/js/pagination.js'
    ], ['client']
  );
});

Package.onTest(function (api) {
});
