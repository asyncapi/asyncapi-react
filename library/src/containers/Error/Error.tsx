import React from 'react';

// import { bemClasses } from '../../helpers';
// import { ERROR_TEXT } from '../../constants';
import { ErrorObject, ValidationError } from '../../types';

// const renderErrors = (errors: ValidationError[]): React.ReactNode => {
//   if (!errors) {
//     return null;
//   }

//   return errors
//     .map((singleError: ValidationError, index: number) => {
//       const formattedError = formatError(singleError);

//       if (!formattedError) {
//         return null;
//       }
//       return (
//         <div key={index}>
//           <code
//             className={bemClasses.element(`error-content-code`)}
//             key={index}
//           >
//             {formattedError}
//           </code>
//         </div>
//       );
//     })
//     .filter(Boolean);
// };

export const formatError = (singleError: ValidationError): string =>
  singleError.title;

interface Props {
  error: ErrorObject;
}

export const Error: React.FunctionComponent<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  return null;
  // const className = `error`;
  // const { title, validationErrors } = error;

  // const header = (
  //   <h2>
  //     {ERROR_TEXT}: {title}
  //   </h2>
  // );

  // return (
  //   <section className={bemClasses.element(className)}>
  //     <Toggle header={header} className={className}>
  //       {validationErrors && validationErrors.length && (
  //         <div className={bemClasses.element(`${className}-body`)}>
  //           <pre className={bemClasses.element(`${className}-body-pre`)}>
  //             {renderErrors(validationErrors)}
  //           </pre>
  //         </div>
  //       )}
  //     </Toggle>
  //   </section>
  // );
};
