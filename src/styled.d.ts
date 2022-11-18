// declaration파일 : 선언파일,
// styled-components를 확장하고, styled-components내에 정의되어 있는 파일들을 override(덮어쓰기)하는 용도

import "styled-components";

// DefaultTheme로 보여질 interface 정의
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
