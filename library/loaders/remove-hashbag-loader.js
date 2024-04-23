/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * Make sure code does not contain properties such as `#property`
 */
module.exports = function(source) {
  return source.replace(/^#! .*\n/, '');
};
