import { rgba, lighten } from 'polished';

/** Dark Glass — fondos cálidos violeta-negro, acentos violeta/rosa y verdes suaves */
export const palette = {
  primary: {
    SOLID: '#c084fc',
    TEXT: '#e9d5ff',
    STRONG: '#a855f7',
    SUBTLE: 'rgba(168, 85, 247, 0.5)'
  },
  hues: {
    RED: 'hsl(8, 72%, 58%)',
    ROSE: 'hsl(330, 78%, 72%)',
    BROWN: 'hsl(32, 58%, 68%)',
    ORANGE: 'hsl(28, 88%, 68%)',
    YELLOW: 'hsl(45, 92%, 68%)',
    GREEN: 'hsl(152, 65%, 52%)',
    GREEN_DARK: 'hsl(158, 78%, 42%)',
    TEAL: 'hsl(172, 58%, 52%)',
    CYAN: 'hsl(192, 78%, 62%)',
    BLUE: 'hsl(217, 88%, 70%)',
    INDIGO: 'hsl(239, 72%, 70%)',
    VIOLET: 'hsl(263, 78%, 72%)',
    PURPLE: 'hsl(280, 72%, 72%)',
    PINK: 'hsl(320, 72%, 72%)'
  },
  system: {
    CONTROL_ACCENT: '#c084fc'
  },
  background: {
    BASE: '#07060b',
    MANTLE: '#0f0d18',
    CRUST: '#161321',
    SURFACE0: '#1c1828',
    SURFACE1: '#2a2438',
    SURFACE2: '#3d3550'
  },
  text: {
    BASE: '#f4f4f8',
    SUBTEXT2: '#c4b8dc',
    SUBTEXT1: '#9d8fb8',
    SUBTEXT0: '#7a6d94'
  },
  overlay: {
    OVERLAY2: '#4a4260',
    OVERLAY1: '#3d3550',
    OVERLAY0: '#2a2438'
  },
  border: {
    BORDER2: 'rgba(255, 255, 255, 0.12)',
    BORDER1: 'rgba(255, 255, 255, 0.08)',
    BORDER0: 'rgba(255, 255, 255, 0.05)'
  },
  utility: {
    WHITE: '#ffffff',
    BLACK: '#050408'
  }
};

palette.intent = {
  INFO: palette.hues.BLUE,
  SUCCESS: palette.hues.GREEN,
  WARNING: palette.hues.ORANGE,
  DANGER: palette.hues.RED
};

palette.syntax = {
  KEYWORD: palette.hues.ROSE,
  TAG: palette.hues.ROSE,
  VARIABLE: palette.hues.PINK,
  PROPERTY: palette.hues.VIOLET,
  DEFINITION: palette.hues.BLUE,
  STRING: palette.hues.BROWN,
  NUMBER: palette.hues.PINK,
  ATOM: palette.hues.ROSE,
  OPERATOR: palette.text.SUBTEXT1,
  TAG_BRACKET: palette.text.SUBTEXT1,
  COMMENT: palette.text.SUBTEXT0
};

const colors = {
  GRAY_2: palette.background.SURFACE1,
  GRAY_3: palette.background.SURFACE1,
  GRAY_4: palette.background.SURFACE2,
  GRAY_5: palette.text.SUBTEXT2
};

const darkTheme = {
  mode: 'dark',
  brand: palette.primary.SOLID,
  text: palette.text.BASE,
  textLink: palette.hues.CYAN,
  draftColor: '#f0ab5c',
  bg: palette.background.BASE,

  primary: {
    solid: palette.primary.SOLID,
    text: palette.primary.TEXT,
    strong: palette.primary.STRONG,
    subtle: palette.primary.SUBTLE
  },

  accents: {
    primary: palette.primary.SOLID
  },

  background: {
    base: palette.background.BASE,
    mantle: palette.background.MANTLE,
    crust: palette.background.CRUST,
    surface0: palette.background.SURFACE0,
    surface1: colors.GRAY_3,
    surface2: colors.GRAY_4
  },

  /* Badges / chips neón: fondos más densos, texto y borde más luminosos */
  status: {
    info: {
      background: rgba(56, 189, 248, 0.26),
      text: '#7dd3fc',
      border: rgba(125, 211, 252, 0.72)
    },
    success: {
      background: rgba(52, 211, 153, 0.26),
      text: '#6ee7b7',
      border: rgba(167, 243, 208, 0.65)
    },
    warning: {
      background: rgba(251, 191, 36, 0.28),
      text: '#fde047',
      border: rgba(253, 224, 71, 0.75)
    },
    danger: {
      background: rgba(251, 113, 133, 0.26),
      text: '#fda4af',
      border: rgba(254, 205, 211, 0.72)
    }
  },

  overlay: {
    overlay2: palette.overlay.OVERLAY2,
    overlay1: palette.overlay.OVERLAY1,
    overlay0: palette.overlay.OVERLAY0
  },

  font: {
    size: {
      xs: '0.6875rem',
      sm: '0.75rem',
      base: '0.8125rem',
      md: '0.875rem',
      lg: '1rem',
      xl: '1.125rem'
    }
  },

  shadow: {
    sm: `0 1px 2px rgba(0, 0, 0, 0.45), 0 0 0 1px ${rgba(168, 85, 247, 0.08)}`,
    md: `0 4px 16px rgba(0, 0, 0, 0.55), 0 0 0 1px ${rgba(168, 85, 247, 0.1)}`,
    lg: `0 12px 40px rgba(0, 0, 0, 0.65), 0 0 0 1px ${rgba(168, 85, 247, 0.12)}`
  },

  border: {
    radius: {
      sm: '6px',
      base: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px'
    },
    border2: palette.border.BORDER2,
    border1: palette.border.BORDER1,
    border0: palette.border.BORDER0
  },

  colors: {
    text: {
      white: palette.text.BASE,
      green: palette.intent.SUCCESS,
      danger: palette.intent.DANGER,
      warning: palette.intent.WARNING,
      muted: palette.text.SUBTEXT1,
      purple: palette.hues.PURPLE,
      yellow: palette.hues.YELLOW,
      subtext2: palette.text.SUBTEXT2,
      subtext1: palette.text.SUBTEXT1,
      subtext0: palette.text.SUBTEXT0
    },
    bg: {
      danger: palette.hues.RED
    },
    accent: palette.system.CONTROL_ACCENT
  },

  input: {
    bg: rgba(255, 255, 255, 0.04),
    border: palette.border.BORDER2,
    focusBorder: rgba(palette.primary.SOLID, 0.85),
    placeholder: {
      color: palette.text.SUBTEXT1,
      opacity: 0.55
    }
  },

  sidebar: {
    color: palette.text.BASE,
    muted: palette.text.SUBTEXT1,
    /* Opaco: evita bugs de composición / backdrop en Electron con sidebar “vacía” */
    bg: palette.background.MANTLE,
    dragbar: {
      border: palette.border.BORDER1,
      activeBorder: rgba(192, 132, 252, 0.45)
    },

    collection: {
      item: {
        bg: palette.background.SURFACE0,
        hoverBg: rgba(168, 85, 247, 0.12),
        focusBorder: palette.border.BORDER2,
        indentBorder: palette.background.SURFACE0,
        active: {
          indentBorder: rgba(168, 85, 247, 0.35)
        },
        example: {
          iconColor: palette.text.BASE
        }
      }
    },

    dropdownIcon: {
      color: palette.text.BASE
    }
  },

  dropdown: {
    color: palette.text.BASE,
    iconColor: palette.text.SUBTEXT2,
    bg: rgba(22, 19, 33, 0.96),
    hoverBg: rgba(168, 85, 247, 0.12),
    shadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px ${rgba(255, 255, 255, 0.06)}`,
    border: palette.border.BORDER1,
    separator: palette.border.BORDER1,
    selectedColor: palette.primary.TEXT,
    mutedText: palette.text.SUBTEXT1
  },

  workspace: {
    accent: palette.primary.SOLID,
    border: palette.border.BORDER2,
    button: {
      bg: colors.GRAY_2
    }
  },

  request: {
    methods: {
      get: palette.hues.GREEN,
      post: palette.hues.INDIGO,
      put: palette.hues.ORANGE,
      delete: lighten(0.08, palette.hues.RED),
      patch: palette.hues.ORANGE,
      options: palette.hues.TEAL,
      head: palette.hues.CYAN
    },

    grpc: palette.hues.TEAL,
    ws: palette.hues.ORANGE,
    gql: palette.hues.PINK
  },

  requestTabPanel: {
    url: {
      bg: palette.background.BASE,
      icon: palette.text.SUBTEXT2,
      iconDanger: '#fb7185',
      border: `solid 1px ${palette.border.BORDER1}`
    },
    dragbar: {
      border: palette.border.BORDER1,
      activeBorder: rgba(192, 132, 252, 0.5)
    },
    responseStatus: palette.text.SUBTEXT2,
    responseOk: palette.hues.GREEN,
    responseError: palette.hues.RED,
    responsePending: palette.hues.BLUE,
    responseOverlayBg: rgba(palette.background.BASE, 0.82),

    card: {
      bg: 'rgba(28, 24, 40, 0.75)',
      border: palette.border.BORDER1,
      hr: palette.border.BORDER2
    },

    graphqlDocsExplorer: {
      bg: palette.background.MANTLE,
      color: palette.text.BASE
    }
  },

  notifications: {
    bg: colors.GRAY_3,
    list: {
      bg: palette.background.SURFACE0,
      borderRight: palette.border.BORDER2,
      borderBottom: palette.border.BORDER2,
      hoverBg: rgba(168, 85, 247, 0.1),
      active: {
        border: palette.primary.STRONG,
        bg: rgba(168, 85, 247, 0.15),
        hoverBg: rgba(168, 85, 247, 0.18)
      }
    }
  },

  modal: {
    title: {
      color: palette.text.BASE,
      bg: 'rgba(20, 17, 32, 0.92)'
    },
    body: {
      color: palette.text.BASE,
      bg: 'rgba(16, 13, 26, 0.94)'
    },
    input: {
      bg: rgba(255, 255, 255, 0.04),
      border: palette.border.BORDER2,
      focusBorder: rgba(palette.primary.SOLID, 0.85)
    },
    backdrop: {
      opacity: 0.55
    }
  },

  button: {
    secondary: {
      color: palette.text.BASE,
      bg: palette.background.SURFACE1,
      border: rgba(192, 132, 252, 0.28),
      hoverBorder: rgba(192, 132, 252, 0.5)
    },
    close: {
      color: palette.text.SUBTEXT2,
      bg: 'transparent',
      border: 'transparent',
      hoverBorder: ''
    },
    disabled: {
      color: palette.text.SUBTEXT0,
      bg: palette.background.SURFACE2,
      border: palette.border.BORDER1
    },
    danger: {
      color: '#fff',
      bg: '#e11d48',
      border: '#e11d48'
    }
  },
  button2: {
    color: {
      primary: {
        bg: '#e879f9',
        text: '#0c0614',
        border: '#f5d0fe'
      },
      light: {
        bg: rgba('#e879f9', 0.2),
        text: '#fae8ff',
        border: rgba('#f0abfc', 0.45)
      },
      secondary: {
        bg: rgba(255, 255, 255, 0.08),
        text: palette.text.BASE,
        border: rgba(192, 132, 252, 0.35)
      },
      success: {
        bg: '#34d399',
        text: '#022c1c',
        border: '#6ee7b7'
      },
      warning: {
        bg: '#fb923c',
        text: '#1c0a01',
        border: '#fdba74'
      },
      danger: {
        bg: '#fb7185',
        text: '#fff1f2',
        border: '#fecdd3'
      }
    }
  },

  tabs: {
    marginRight: '1.2rem',
    active: {
      fontWeight: 500,
      color: palette.text.BASE,
      border: palette.primary.STRONG
    },
    secondary: {
      active: {
        bg: palette.background.SURFACE0,
        color: palette.text.BASE
      },
      inactive: {
        bg: palette.background.SURFACE0,
        color: palette.text.SUBTEXT1
      }
    }
  },

  requestTabs: {
    color: palette.text.BASE,
    bg: palette.background.SURFACE0,
    bottomBorder: palette.border.BORDER1,
    icon: {
      color: palette.text.SUBTEXT1,
      hoverColor: palette.text.BASE,
      hoverBg: rgba(168, 85, 247, 0.12)
    },
    example: {
      iconColor: colors.GRAY_5
    }
  },

  codemirror: {
    bg: palette.background.BASE,
    border: palette.background.BASE,
    placeholder: {
      color: palette.text.SUBTEXT1,
      opacity: 0.5
    },
    gutter: {
      bg: palette.background.BASE
    },
    variable: {
      valid: palette.hues.GREEN_DARK,
      invalid: palette.hues.RED,
      prompt: palette.hues.BLUE
    },
    tokens: {
      definition: palette.syntax.DEFINITION,
      property: palette.syntax.PROPERTY,
      string: palette.syntax.STRING,
      number: palette.syntax.NUMBER,
      atom: palette.syntax.ATOM,
      variable: palette.syntax.VARIABLE,
      keyword: palette.syntax.KEYWORD,
      comment: palette.syntax.COMMENT,
      operator: palette.syntax.OPERATOR,
      tag: palette.syntax.TAG,
      tagBracket: palette.syntax.TAG_BRACKET
    },
    searchLineHighlightCurrent: 'rgba(168, 85, 247, 0.15)',
    searchMatch: '#fde047',
    searchMatchActive: '#fef08a'
  },

  table: {
    border: palette.border.BORDER2,
    thead: {
      color: palette.text.SUBTEXT2
    },
    striped: palette.background.MANTLE,
    input: {
      color: palette.text.BASE
    }
  },

  plainGrid: {
    hoverBg: colors.GRAY_3
  },

  scrollbar: {
    color: 'rgba(168, 132, 220, 0.35)'
  },

  dragAndDrop: {
    border: palette.border.BORDER2,
    borderStyle: '2px solid',
    hoverBg: rgba(168, 85, 247, 0.08),
    transition: 'all 0.1s ease'
  },
  infoTip: {
    bg: rgba(22, 19, 33, 0.96),
    border: palette.border.BORDER1,
    boxShadow: `0 8px 28px rgba(0, 0, 0, 0.55), 0 0 0 1px ${rgba(168, 85, 247, 0.12)}`
  },

  statusBar: {
    border: palette.border.BORDER1,
    color: palette.text.SUBTEXT1
  },

  console: {
    bg: palette.background.MANTLE,
    headerBg: palette.background.CRUST,
    contentBg: palette.background.MANTLE,
    border: palette.border.BORDER2,
    titleColor: palette.text.BASE,
    countColor: palette.text.SUBTEXT1,
    buttonColor: palette.text.SUBTEXT2,
    buttonHoverBg: rgba(168, 85, 247, 0.12),
    buttonHoverColor: palette.text.BASE,
    messageColor: palette.text.BASE,
    timestampColor: palette.text.SUBTEXT1,
    emptyColor: palette.text.SUBTEXT1,
    logHoverBg: rgba(255, 255, 255, 0.04),
    resizeHandleHover: palette.primary.SOLID,
    resizeHandleActive: palette.primary.STRONG,
    dropdownBg: palette.background.SURFACE0,
    dropdownHeaderBg: palette.background.CRUST,
    optionHoverBg: rgba(168, 85, 247, 0.1),
    optionLabelColor: palette.text.BASE,
    optionCountColor: palette.text.SUBTEXT1,
    checkboxColor: palette.primary.SOLID,
    scrollbarTrack: palette.background.MANTLE,
    scrollbarThumb: 'rgba(168, 132, 220, 0.35)',
    scrollbarThumbHover: 'rgba(192, 132, 252, 0.5)'
  },

  grpc: {
    tabNav: {
      container: {
        bg: palette.background.SURFACE0
      },
      button: {
        active: {
          bg: palette.background.SURFACE1,
          color: palette.text.BASE
        },
        inactive: {
          bg: 'transparent',
          color: palette.text.SUBTEXT1
        }
      }
    },
    importPaths: {
      header: {
        text: palette.text.SUBTEXT1,
        button: {
          color: palette.text.SUBTEXT1,
          hoverColor: palette.text.BASE
        }
      },
      error: {
        bg: 'transparent',
        text: '#fb7185',
        link: {
          color: '#fb7185',
          hoverColor: '#fda4af'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: rgba(168, 85, 247, 0.08),
        text: palette.text.BASE,
        icon: palette.text.SUBTEXT1,
        checkbox: {
          color: palette.text.BASE
        },
        invalid: {
          opacity: 0.6,
          text: '#fb7185'
        }
      },
      empty: {
        text: palette.text.SUBTEXT1
      },
      button: {
        bg: palette.background.SURFACE1,
        color: palette.text.BASE,
        border: rgba(192, 132, 252, 0.35),
        hoverBorder: rgba(192, 132, 252, 0.55)
      }
    },
    protoFiles: {
      header: {
        text: palette.text.SUBTEXT1,
        button: {
          color: palette.text.SUBTEXT1,
          hoverColor: palette.text.BASE
        }
      },
      error: {
        bg: 'transparent',
        text: '#fb7185',
        link: {
          color: '#fb7185',
          hoverColor: '#fda4af'
        }
      },
      item: {
        bg: 'transparent',
        hoverBg: rgba(168, 85, 247, 0.08),
        selected: {
          bg: rgba(168, 85, 247, 0.2),
          border: palette.primary.SOLID
        },
        text: palette.text.BASE,
        secondaryText: palette.text.SUBTEXT1,
        icon: palette.text.SUBTEXT1,
        invalid: {
          opacity: 0.6,
          text: '#fb7185'
        }
      },
      empty: {
        text: palette.text.SUBTEXT1
      },
      button: {
        bg: palette.background.SURFACE1,
        color: palette.text.BASE,
        border: rgba(192, 132, 252, 0.35),
        hoverBorder: rgba(192, 132, 252, 0.55)
      }
    }
  },
  deprecationWarning: {
    bg: 'rgba(251, 113, 133, 0.12)',
    border: 'rgba(251, 113, 133, 0.2)',
    icon: '#fb7185',
    text: palette.text.SUBTEXT2
  },

  examples: {
    buttonBg: rgba(192, 132, 252, 0.14),
    buttonColor: palette.primary.SOLID,
    buttonText: '#fff',
    buttonIconColor: '#fff',
    border: palette.border.BORDER2,
    urlBar: {
      border: colors.GRAY_3,
      bg: palette.background.SURFACE0
    },
    table: {
      thead: {
        bg: palette.background.SURFACE0,
        color: palette.text.SUBTEXT1
      }
    },
    checkbox: {
      color: '#000'
    }
  },

  app: {
    collection: {
      toolbar: {
        environmentSelector: {
          bg: palette.background.BASE,
          border: colors.GRAY_3,
          icon: palette.primary.TEXT,
          text: palette.text.BASE,
          caret: palette.text.SUBTEXT1,
          separator: colors.GRAY_3,
          hoverBg: palette.background.SURFACE0,
          hoverBorder: colors.GRAY_4,

          noEnvironment: {
            text: palette.text.SUBTEXT1,
            bg: palette.background.BASE,
            border: colors.GRAY_3,
            hoverBg: palette.background.SURFACE0,
            hoverBorder: colors.GRAY_4
          }
        },
        sandboxMode: {
          safeMode: {
            bg: 'rgba(52, 211, 153, 0.14)',
            color: palette.hues.GREEN
          },
          developerMode: {
            bg: rgba(192, 132, 252, 0.14),
            color: palette.hues.YELLOW
          }
        }
      }
    }
  }
};

export default darkTheme;
