export interface ErrorState {
  response: {
    errors: [
      {
        message: string;
        extensions: {
          code: string;
          exception: {
            response: {
              error: string;
            };
            status: number;
            message: string;
            name: string;
          };
        };
      }
    ];
    data: null;
    status: number;
  };
}
