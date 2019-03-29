var express = require('express');
var router = express.Router();

router.get('/:locale', (req, res, next) => {
  
  // retrieve current locale
  const locale = req.params.locale;

  // save referer page
  const backTo = req.get('referer');

  // set response cookie for new language
  res.cookie('nodepop-lang', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 }); // 20 days

  // redirect to referer
  res.redirect(backTo);
});

module.exports = router;
