import baseStyled, { ThemedStyledInterface } from 'styled-components';

export type Theme = {
  fontFamily: string,
  badge: {
    padding: string,
    fontSize: string,
    borderRadius: string,
    subscribe: {
      bgColor: string,
      color: string,
    },
    publish: {
      bgColor: string,
      color: string,
    },
    deprecated: {
      bgColor: string,
      color: string,
    },
    required: {
      bgColor: string,
      color: string,
      fontSize: string,
      borderRadius: string,
      padding: string,
      margin: string,
      float: string,
    }
  },
  tag: {
    fontSize: string,
    bgColor: string,
    borderRadius: string,
    padding: string,
    margin: string,
  },
  table: {
    margin: string,
    boxShadow: string,
    head: {
      fontSize: string,
      row: {
        fontWeight: string,
        color: string,
        bgColor: string,
      },
      cell: {
        padding: string,
      }
    },
    body: {
      fontSize: string,
      row: {
        nthOfTypeBgColor: string,
        bgColor: string;
      },
      cell: {
        padding: string,
      }
    },
  },
  code: {
    borderRadius: string,
    header: {
      padding: string,
    },
    content: {
      bgColor: string,
      padding: string,
    },
  },
}

export const defaultTheme: Theme = {
  fontFamily: "Helvetica Neue, Helvetica, Arial, Verdana, sans-serif",
  badge: {
    padding: "3px 10px",
    fontSize: "12px",
    borderRadius: "5px",
    subscribe: {
      bgColor: "#039be5",
      color: "#fff"
    },
    publish: {
      bgColor: "#d4e157",
      color: "#fff"
    },
    deprecated: {
      bgColor: "#ffa726",
      color: "#fff"
    },
    required: {
      bgColor: "#666",
      color: "#fff",
      fontSize: "12px",
      borderRadius: "3px",
      padding: "0 5px",
      margin: "0 0 0 5px",
      float: "right",
    }
  },
  tag: {
    fontSize: "15px",
    bgColor: "#607d8b",
    borderRadius: "5px",
    padding: "3px 10px",
    margin: "0 5px 5px 0",
  },
  table: {
    margin: "0 0 40px 0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    head: {
      fontSize: "14px",
      row: {
        fontWeight: "900",
        color: "#fff",
        bgColor: "#00796b",
      },
      cell: {
        padding: "6px 12px",
      }
    },
    body: {
      fontSize: "14px",
      row: {
        nthOfTypeBgColor: "#f6f6f6",
        bgColor: "#e9e9e9",
      },
      cell: {
        padding: "6px 12px",
      }
    },
  },
  code: {
    borderRadius: "0",
    header: {
      padding: "0",
    },
    content: {
      bgColor: "#eee",
      padding: "10px 15px",
    }
  },
}

export const styled = baseStyled as ThemedStyledInterface<Theme>;