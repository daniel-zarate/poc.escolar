CREATE SCHEMA IF NOT EXISTS met;

CREATE TABLE met.TD_TRABAJADOR
(
  ID_TRABAJADOR           bigserial not null primary key,
  CVE_RAMO                VARCHAR(10)     NOT NULL,
  CVE_UNIDAD_RESPONSABLE  VARCHAR(10)     NOT NULL,
  NOMBRE                  VARCHAR(50)     NOT NULL,
  APELLIDO_PATERNO        VARCHAR(30)     NOT NULL,
  APELLIDO_MATERNO        VARCHAR(30),
  CURP                    VARCHAR(18)     NOT NULL,
  RFC                     VARCHAR(13)     NOT NULL,
  NUM_TRABAJADOR          VARCHAR(10),
  FECHA_NACIMIENTO        DATE,
  CVE_SEXO                INTEGER,
  CVE_PAIS                INTEGER,
  FOLIO_ACTIVITI          VARCHAR(64),
  NUM_SEGURO_SOCIAL       BIGINT,
  CVE_NACIONALIDAD        INTEGER,
  CVE_ESTATUS             VARCHAR(60)     NOT NULL,
  RFC_USUARIO             VARCHAR(13)     NOT NULL,
  FECHA                   TIMESTAMP(6)          NOT NULL,
  CVE_ENTIDAD_FEDERATIVA  VARCHAR(2),
  CVE_MUNICIPIO           VARCHAR(3),
  FOLIO_SOLICITUD         BIGINT,
  NUMERO_TRABAJADOR       VARCHAR(20),
  CVE_ESTADO_CIVIL        INTEGER,
  ID_FOTO                 VARCHAR(50)     DEFAULT NULL
);

CREATE TABLE MET.TC_RUTA_ARCHIVOS
(
  ID             bigserial              NOT NULL PRIMARY KEY,
  RUTA_ABSOLUTA  VARCHAR(250)             NOT NULL,
  NOMBRE         VARCHAR(250)             NOT NULL,
  FECHA          TIMESTAMP(6),
  EXTENSION      VARCHAR(6)
);

CREATE TABLE MET.TR_TRABAJADOR_DOCUMENTOS
(
  ID_TRABAJADOR  BIGINT                   NOT NULL,
  ID_DOCUMENTO   BIGINT             NOT NULL
);

ALTER TABLE MET.TR_TRABAJADOR_DOCUMENTOS ADD CONSTRAINT TR_TRABAJADOR_DOCUMENTOS_PK
PRIMARY KEY (ID_TRABAJADOR, ID_DOCUMENTO);

ALTER TABLE MET.TR_TRABAJADOR_DOCUMENTOS ADD
CONSTRAINT TR_TRABAJADOR_DOC_TD_TRAB_FK1
FOREIGN KEY (ID_TRABAJADOR)
REFERENCES MET.TD_TRABAJADOR (ID_TRABAJADOR);

ALTER TABLE MET.TR_TRABAJADOR_DOCUMENTOS ADD
CONSTRAINT TR_TRAB_DOC_TC_RUTA_ARCH_FK1
FOREIGN KEY (ID_DOCUMENTO)
REFERENCES MET.TC_RUTA_ARCHIVOS (ID);

CREATE TABLE MET.TD_DATOS_GENERALES
(
  ID_DATOS_GENERALES      BIGSERIAL             NOT NULL PRIMARY KEY,
  ID_TRABAJADOR           BIGINT                NOT NULL,
  TELEFONO_CELULAR        VARCHAR(10),
  CORREO_ELECTRONICO      VARCHAR(50),
  CALLE                   VARCHAR(120)    NOT NULL,
  CODIGO_POSTAL           VARCHAR(5)      NOT NULL,
  CVE_COLONIA             BIGINT      NOT NULL,
  CVE_ENTIDAD_FEDERATIVA  BIGINT      NOT NULL,
  CVE_MUNICIPIO           BIGINT      NOT NULL,
  LOCALIDAD               VARCHAR(100),
  OBSERVACIONES           VARCHAR(500),
  TELEFONO_FIJO           VARCHAR(10),
  ID_DOCUMENTO            BIGINT,
  RFC_USUARIO             VARCHAR(13)     NOT NULL,
  FECHA                   TIMESTAMP(6)          NOT NULL
);

ALTER TABLE MET.TD_DATOS_GENERALES ADD CONSTRAINT TD_DATOS_GENERALES_TC_COL_FK1
FOREIGN KEY (CVE_COLONIA)
REFERENCES CATALOGOS.TC_COLONIA (CVE_COLONIA,CVE_ENTIDAD_FEDERATIVA,CVE_MUNICIPIO);

ALTER TABLE MET.TD_DATOS_GENERALES ADD CONSTRAINT TD_DATOS_GENERALES_TC_EF_FK1
FOREIGN KEY (CVE_ENTIDAD_FEDERATIVA)
REFERENCES CATALOGOS.TC_ENTIDAD_FEDERATIVA (CVE_ENTIDAD_FEDERATIVA);

ALTER TABLE MET.TD_DATOS_GENERALES ADD CONSTRAINT TD_DATOS_GENERALES_TC_MUN_FK1
FOREIGN KEY (CVE_MUNICIPIO)
REFERENCES CATALOGOS.TC_MUNICIPIO (CVE_MUNICIPIO);

ALTER TABLE MET.TD_DATOS_GENERALES ADD CONSTRAINT TD_DATOS_GENERALES_TC_RUTA_FK1
FOREIGN KEY (ID_DOCUMENTO)
REFERENCES MET.TC_RUTA_ARCHIVOS (ID);

ALTER TABLE MET.TD_DATOS_GENERALES ADD CONSTRAINT TD_DATOS_GENERALES_TD_TRA_FK1
FOREIGN KEY (ID_TRABAJADOR)
REFERENCES MET.TD_TRABAJADOR (ID_TRABAJADOR);


CREATE TABLE MET.TD_FORMACION_ACADEMICA
(
  ID_FORMACION_ACADEMICA BIGSERIAL       NOT NULL PRIMARY KEY,
  ID_TRABAJADOR          BIGINT       NOT NULL,
  CVE_NIVEL              BIGINT       NOT NULL,
  INSTITUCION_EDUCATIVA  VARCHAR (150) NOT NULL,
  CARRERA                VARCHAR (50),
  CVE_DOCUMENTO          BIGINT       NOT NULL,
  RFC_USUARIO            VARCHAR (13) NOT NULL,
  FECHA                  TIMESTAMP(6) NOT NULL,
  NUMERO_CEDULA          VARCHAR (10),
  ANIOS                  INTEGER,
  ID_CARRERA             BIGINT
);

ALTER TABLE MET.TD_FORMACION_ACADEMICA ADD CONSTRAINT TD_FORMACION_ACADEM_TC_NIV_FK2
FOREIGN KEY (CVE_NIVEL)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_FORMACION_ACADEMICA ADD CONSTRAINT TD_FORM_ACADEMICA_TD_TRA_FK1
FOREIGN KEY (ID_TRABAJADOR)
REFERENCES MET.TD_TRABAJADOR (ID_TRABAJADOR);

ALTER TABLE MET.TD_FORMACION_ACADEMICA ADD CONSTRAINT TD_FORM_ACAD_CARRERA_FK5
FOREIGN KEY (ID_CARRERA)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_FORMACION_ACADEMICA ADD CONSTRAINT TD_FORM_ACAD_TC_CAT_DOC_FK3
FOREIGN KEY (CVE_DOCUMENTO)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);


CREATE TABLE MET.TD_ESQUEMA_PAGO
(
  ID_ESQUEMA_PAGO  BIGSERIAL                       NOT NULL PRIMARY KEY,
  ID_TRABAJADOR    BIGINT                       NOT NULL,
  BANCARIZADO      SMALLINT             NOT NULL,
  CVE_BANCO        BIGINT,
  CLABE            VARCHAR(18),
  ID_DOCUMENTO     BIGINT,
  RFC_USUARIO      VARCHAR(13)            NOT NULL,
  FECHA            TIMESTAMP(6) DEFAULT current_timestamp NOT NULL
);


ALTER TABLE MET.TD_ESQUEMA_PAGO ADD CONSTRAINT TD_ESQUEMA_PAGO_TC_BANCO_FK1
FOREIGN KEY (CVE_BANCO)
REFERENCES CATALOGOS.TC_BANCO (CVE_BANCO);

ALTER TABLE MET.TD_ESQUEMA_PAGO ADD CONSTRAINT TD_ESQUEMA_PAGO_TC_RUTA_FK1
FOREIGN KEY (ID_DOCUMENTO)
REFERENCES MET.TC_RUTA_ARCHIVOS (ID);

ALTER TABLE MET.TD_ESQUEMA_PAGO ADD CONSTRAINT TD_ESQUEMA_PAGO_TD_TRABAJ_FK1
FOREIGN KEY (ID_TRABAJADOR)
REFERENCES MET.TD_TRABAJADOR (ID_TRABAJADOR);

CREATE TABLE MET.TD_DEPENDIENTES
(
  ID_DEPENDIENTE    BIGSERIAL                   NOT NULL PRIMARY KEY,
  ID_TRABAJADOR     BIGINT                      NOT NULL,
  CURP_DEPENDIENTE  VARCHAR(18)           NOT NULL,
  NOMBRE            VARCHAR(50),
  APELLIDO_PATERNO  VARCHAR(50),
  APELLIDO_MATERNO  VARCHAR(50),
  FECHA_NACIMIENTO  DATE,
  CVE_SEXO          BIGINT,
  CVE_PARENTESCO    BIGINT,
  CVE_NIVEL         BIGINT,
  CVE_GRADO         BIGINT,
  RFC_USUARIO       VARCHAR(13)           NOT NULL,
  FECHA             TIMESTAMP(6)                NOT NULL
);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES_TC_GRADO_FK1
FOREIGN KEY (CVE_NIVEL, CVE_GRADO)
REFERENCES CATALOGOS.TC_GRADO (CVE_NIVEL,CVE_GRADO);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES_TC_NIV_FK4
FOREIGN KEY (CVE_NIVEL)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES_TC_SEX_FK2
FOREIGN KEY (CVE_SEXO)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES_TD_TRABAJ_FK1
FOREIGN KEY (ID_TRABAJADOR)
REFERENCES MET.TD_TRABAJADOR (ID_TRABAJADOR);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES__TC_PAR_FK3
FOREIGN KEY (CVE_PARENTESCO)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);


CREATE TABLE MET.TR_DEPENDIENTE_DOCUMENTOS
(
  ID_DEPENDIENTE  BIGINT                        NOT NULL,
  ID_DOCUMENTO    BIGINT             NOT NULL
);

ALTER TABLE MET.TR_DEPENDIENTE_DOCUMENTOS ADD CONSTRAINT TR_DEPENDIENTE_DOCUMENTOS_PK
PRIMARY KEY (ID_DEPENDIENTE, ID_DOCUMENTO);

ALTER TABLE MET.TR_DEPENDIENTE_DOCUMENTOS ADD CONSTRAINT TR_DEPENDIENTE_DOC_TD_DEP_FK1
FOREIGN KEY (ID_DEPENDIENTE)
REFERENCES MET.TD_DEPENDIENTES (ID_DEPENDIENTE);

ALTER TABLE MET.TR_DEPENDIENTE_DOCUMENTOS ADD CONSTRAINT TR_DEPEN_DOC_TC_RUTA_ARCH_FK1
FOREIGN KEY (ID_DOCUMENTO)
REFERENCES MET.TC_RUTA_ARCHIVOS (ID);

CREATE TABLE MET.TR_FORMACION_DOCUMENTOS
(
  ID_FORMACION_ACADEMICA  BIGINT                NOT NULL,
  ID_DOCUMENTO            BIGINT     NOT NULL
);

ALTER TABLE MET.TR_FORMACION_DOCUMENTOS ADD CONSTRAINT TR_FORMACION_DOCUMENTOS_PK
PRIMARY KEY (ID_FORMACION_ACADEMICA, ID_DOCUMENTO);

ALTER TABLE MET.TR_FORMACION_DOCUMENTOS ADD CONSTRAINT TR_FORMACION_DOC_TD_FORM_FK1
FOREIGN KEY (ID_FORMACION_ACADEMICA)
REFERENCES MET.TD_FORMACION_ACADEMICA (ID_FORMACION_ACADEMICA);

ALTER TABLE MET.TR_FORMACION_DOCUMENTOS ADD CONSTRAINT TR_FORM_DOC_TC_RUTA_ARCH_FK1
FOREIGN KEY (ID_DOCUMENTO)
REFERENCES MET.TC_RUTA_ARCHIVOS (ID);

CREATE TABLE MET.TD_DEPENDIENTES
(
  ID_DEPENDIENTE    BIGSERIAL                      NOT NULL PRIMARY KEY ,
  ID_TRABAJADOR     BIGINT                      NOT NULL,
  CURP_DEPENDIENTE  VARCHAR(18)           NOT NULL,
  NOMBRE            VARCHAR(50),
  APELLIDO_PATERNO  VARCHAR(50),
  APELLIDO_MATERNO  VARCHAR(50),
  FECHA_NACIMIENTO  DATE,
  CVE_SEXO          BIGINT,
  CVE_PARENTESCO    BIGINT,
  CVE_NIVEL         BIGINT,
  CVE_GRADO         BIGINT,
  RFC_USUARIO       VARCHAR(13)           NOT NULL,
  FECHA             TIMESTAMP(6)                NOT NULL
);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES_TC_GRADO_FK1
FOREIGN KEY (CVE_NIVEL, CVE_GRADO)
REFERENCES CATALOGOS.TC_GRADO (CVE_NIVEL,CVE_GRADO);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES_TC_NIV_FK4
FOREIGN KEY (CVE_NIVEL)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES_TC_SEX_FK2
FOREIGN KEY (CVE_SEXO)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES_TD_TRABAJ_FK1
FOREIGN KEY (ID_TRABAJADOR)
REFERENCES MET.TD_TRABAJADOR (ID_TRABAJADOR);

ALTER TABLE MET.TD_DEPENDIENTES ADD CONSTRAINT TD_DEPENDIENTES__TC_PAR_FK3
FOREIGN KEY (CVE_PARENTESCO)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

CREATE TABLE MET.TD_TRAYECTORIA_LABORAL
(
  ID_TRAYECTORIA_LABORAL  BIGSERIAL                NOT NULL PRIMARY KEY ,
  ID_TRABAJADOR           BIGINT                NOT NULL,
  CVE_REGIMEN             BIGINT,
  RFC_USUARIO             VARCHAR(13)     NOT NULL,
  FECHA                   TIMESTAMP(6),
  AHORRO_SOLIDARIO        NUMERIC
);

ALTER TABLE MET.TD_TRAYECTORIA_LABORAL ADD CONSTRAINT TD_TRAYECTORIA_LABORAL_TC_FK1
FOREIGN KEY (CVE_REGIMEN)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_TRAYECTORIA_LABORAL ADD CONSTRAINT TD_TRAYECTORIA_LABORAL_TD_FK1
FOREIGN KEY (ID_TRABAJADOR)
REFERENCES MET.TD_TRABAJADOR (ID_TRABAJADOR);


CREATE TABLE MET.TD_TRAYECTORIA_ANTIGUEDAD
(
  ID                      BIGSERIAL                NOT NULL PRIMARY KEY ,
  ID_TIPO_ANTIGUEDAD      INTEGER                NOT NULL,
  ID_TRAYECTORIA_LABORAL  BIGINT                NOT NULL,
  ANIOS                   INTEGER                NOT NULL,
  MESES                   INTEGER                NOT NULL,
  DIAS                    INTEGER                NOT NULL
);

ALTER TABLE MET.TD_TRAYECTORIA_ANTIGUEDAD ADD CONSTRAINT TD_TRAYECTORIA_ANTIGUEDAD_FK1
FOREIGN KEY (ID_TRAYECTORIA_LABORAL)
REFERENCES MET.TD_TRAYECTORIA_LABORAL (ID_TRAYECTORIA_LABORAL);

CREATE TABLE MET.TD_TRAYECTORIA_DETALLE
(
  ID_TRAYECTORIA_DETALLE  BIGSERIAL                NOT NULL PRIMARY KEY ,
  ID_TRAYECTORIA_LABORAL  BIGINT                NOT NULL,
  DEPENDENCIA             VARCHAR(150)    NOT NULL,
  ID_TIPO_ANTIGUEDAD      BIGINT,
  ID_RAMA                 BIGINT,
  ID_PERIODO              BIGINT                NOT NULL,
  DESDE                   TIMESTAMP(6)          NOT NULL,
  HASTA                   TIMESTAMP(6),
  RFC_USUARIO             VARCHAR(13)     NOT NULL,
  FECHA                   TIMESTAMP(6)          NOT NULL
);


ALTER TABLE MET.TD_TRAYECTORIA_DETALLE ADD CONSTRAINT TR_TRAYDET_TIPO_PERIODO_FK
FOREIGN KEY (ID_PERIODO)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_TRAYECTORIA_DETALLE ADD CONSTRAINT TR_TRAYDET_TIPO_RAMA_FK
FOREIGN KEY (ID_RAMA)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

ALTER TABLE MET.TD_TRAYECTORIA_DETALLE ADD CONSTRAINT TR_TRAYECTORIA_DETALLE_FK1
FOREIGN KEY (ID_TRAYECTORIA_LABORAL)
REFERENCES MET.TD_TRAYECTORIA_LABORAL (ID_TRAYECTORIA_LABORAL);

ALTER TABLE MET.TD_TRAYECTORIA_DETALLE ADD CONSTRAINT TR_TRAYEC_DET_ANTIGUEDAD_FK2
FOREIGN KEY (ID_TIPO_ANTIGUEDAD)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);

CREATE TABLE MET.TR_TRAYECTORIA_DOCUMENTOS
(
  ID_TRAYECTORIA_DETALLE  BIGINT                NOT NULL,
  ID_DOCUMENTO            BIGINT     NOT NULL
);

ALTER TABLE MET.TR_TRAYECTORIA_DOCUMENTOS ADD CONSTRAINT TR_TRAY_DOCUMENTOS_PK
PRIMARY KEY
(ID_TRAYECTORIA_DETALLE, ID_DOCUMENTO);

ALTER TABLE MET.TR_TRAYECTORIA_DOCUMENTOS ADD CONSTRAINT TD_TRAYDET_DOCUMENTOS_FK
FOREIGN KEY (ID_TRAYECTORIA_DETALLE)
REFERENCES MET.TD_TRAYECTORIA_DETALLE (ID_TRAYECTORIA_DETALLE);

ALTER TABLE MET.TR_TRAYECTORIA_DOCUMENTOS ADD CONSTRAINT TR_TRAY_LAB_TCRUTA_ARCH_FK1
FOREIGN KEY (ID_DOCUMENTO)
REFERENCES MET.TC_RUTA_ARCHIVOS (ID);
/***Catalogos**/

CREATE SCHEMA IF NOT EXISTS catalogos;

CREATE TABLE CATALOGOS.TC_CATALOGOS
(
  ID           BIGSERIAL                  NOT NULL PRIMARY KEY,
  CLAVE        VARCHAR(10)                NOT NULL,
  DESCRIPCION  VARCHAR(250)               NOT NULL,
  ORIGEN       VARCHAR(100)               NOT NULL,
  RFC_USUARIO  VARCHAR(13)                NOT NULL,
  FECHA        TIMESTAMP(6)               DEFAULT NOW()         NOT NULL
);


CREATE TABLE CATALOGOS.TC_GRADO
(
  CVE_NIVEL    BIGINT                           NOT NULL,
  CVE_GRADO    BIGINT                           NOT NULL,
  GRADO        VARCHAR(20)                NOT NULL,
  RFC_USUARIO  VARCHAR(13)                NOT NULL,
  FECHA        TIMESTAMP(6)                     NOT NULL
);

ALTER TABLE CATALOGOS.TC_GRADO ADD CONSTRAINT TC_GRADO_PK
PRIMARY KEY (CVE_NIVEL, CVE_GRADO);

ALTER TABLE CATALOGOS.TC_GRADO ADD CONSTRAINT TC_GRADO_TC_CATALOGOS_FK1
FOREIGN KEY (CVE_NIVEL)
REFERENCES CATALOGOS.TC_CATALOGOS (ID);


CREATE TABLE CATALOGOS.TC_RAMO
(
  ID_RAMO      BIGSERIAL                        NOT NULL PRIMARY KEY ,
  CLAVE        VARCHAR(10)                NOT NULL,
  DESCRIPCION  VARCHAR(25)
);


ALTER TABLE CATALOGOS.TC_RAMO ADD CONSTRAINT TC_RAMO_UK1
UNIQUE (CLAVE);

CREATE TABLE CATALOGOS.TC_UNIDAD_RESPONSABLE
(
  ID_UNIDAD_RESPONSABLE  BIGSERIAL                 NOT NULL PRIMARY KEY ,
  ID_RAMO                BIGINT                 NOT NULL,
  CLAVE                  VARCHAR(10)      NOT NULL,
  DESCRIPCION            VARCHAR(50),
  CLAVE_UR_CURP          VARCHAR(3),
  CALLE_NUM_SEDE         VARCHAR(250),
  COLONIA_SEDE           VARCHAR(250),
  CP_SEDE                VARCHAR(5),
  CLAVE_PAGADURIA        VARCHAR(5),
  MUNICIPIO_SEDE         VARCHAR(250),
  CVE_ENTIDAD_ORIGEN     VARCHAR(10),
  ID_CENTRO_PAGO_SAR     VARCHAR(10),
  CVE_SERICA             VARCHAR(8)
);


ALTER TABLE CATALOGOS.TC_UNIDAD_RESPONSABLE ADD CONSTRAINT TC_UNIDAD_RESPONSABLE_TC__FK1
FOREIGN KEY (ID_RAMO)
REFERENCES CATALOGOS.TC_RAMO (ID_RAMO);


CREATE TABLE CATALOGOS.TC_ENTIDAD_FEDERATIVA
(
  CVE_ENTIDAD_FEDERATIVA  BIGSERIAL      NOT NULL PRIMARY KEY,
  DESCRIPCION             VARCHAR(50)     NOT NULL,
  RFC_USUARIO             VARCHAR(13)     NOT NULL,
  FECHA                   TIMESTAMP(6)          NOT NULL
);

CREATE TABLE CATALOGOS.TC_MUNICIPIO
(
  CVE_MUNICIPIO           BIGSERIAL      NOT NULL PRIMARY KEY,
  CVE_ENTIDAD_FEDERATIVA  BIGINT     NOT NULL,
  DESCRIPCION             VARCHAR(60)     NOT NULL,
  RFC_USUARIO             VARCHAR(13)     NOT NULL,
  FECHA                   TIMESTAMP(6)          NOT NULL
);

ALTER TABLE CATALOGOS.TC_MUNICIPIO ADD CONSTRAINT TC_MUNICIPIO_TC_ENT_FED_FK1
FOREIGN KEY (CVE_ENTIDAD_FEDERATIVA)
REFERENCES CATALOGOS.TC_ENTIDAD_FEDERATIVA (CVE_ENTIDAD_FEDERATIVA);

CREATE TABLE CATALOGOS.TC_COLONIA
(
  CVE_COLONIA             BIGSERIAL      NOT NULL PRIMARY KEY,
  CVE_ENTIDAD_FEDERATIVA  BIGINT      NOT NULL,
  CVE_MUNICIPIO           BIGINT      NOT NULL,
  DESCRIPCION             VARCHAR(100)    NOT NULL,
  RFC_USUARIO             VARCHAR(13)     NOT NULL,
  FECHA                   TIMESTAMP(6)          NOT NULL,
  CODIGO_POSTAL           VARCHAR(5)      NOT NULL
);

ALTER TABLE CATALOGOS.TC_COLONIA ADD CONSTRAINT TC_COLONIA_TC_MUNICIPIO_FK1
FOREIGN KEY (CVE_MUNICIPIO)
REFERENCES CATALOGOS.TC_MUNICIPIO (CVE_MUNICIPIO);

ALTER TABLE CATALOGOS.TC_COLONIA ADD CONSTRAINT TC_COLONIA_TC_ENT_FED_FK1
FOREIGN KEY (CVE_ENTIDAD_FEDERATIVA)
REFERENCES CATALOGOS.TC_ENTIDAD_FEDERATIVA (CVE_ENTIDAD_FEDERATIVA);


CREATE TABLE CATALOGOS.TC_AREA_CONOCIMIENTO
(
  CVE_AREA_CONOCIMIENTO  BIGSERIAL           NOT NULL PRIMARY KEY ,
  DESCRIPCION            VARCHAR(50)      NOT NULL
);


CREATE TABLE CATALOGOS.TC_BANCO
(
  CVE_BANCO        BIGSERIAL             NOT NULL PRIMARY KEY ,
  NOMBRE_CORTO     VARCHAR(30)            NOT NULL,
  NOMBRE_COMPLETO  VARCHAR(100)           NOT NULL,
  SN_ACTIVO        SMALLINT                       NOT NULL,
  RFC_USUARIO      VARCHAR(13)            NOT NULL,
  FECHA            TIMESTAMP(6)                 NOT NULL
);

CREATE TABLE CATALOGOS.TC_CARRERA
(
  CVE_CARRERA  BIGSERIAL                     NOT NULL PRIMARY KEY,
  DESCRIPCION  VARCHAR(60)                NOT NULL,
  RFC_USUARIO  VARCHAR(13)                NOT NULL,
  FECHA        TIMESTAMP(6)                     NOT NULL
);

CREATE TABLE CATALOGOS.TC_DOCUMENTOS_EXPEDIENTE
(
  CVE_DOCUMENTO  BIGSERIAL              NOT NULL PRIMARY KEY ,
  SECCION        VARCHAR(2)               NOT NULL,
  DOCUMENTO      VARCHAR(40)              NOT NULL,
  REQUERIDO      SMALLINT                   NOT NULL,
  NOMECLATURA    VARCHAR(25)              NOT NULL,
  ID_PARENTEZCO  VARCHAr(100)             DEFAULT NULL
);

CREATE TABLE CATALOGOS.TC_ESTATUS
(
  CVE_ESTATUS       BIGSERIAL                NOT NULL PRIMARY KEY ,
  CVE_TIPO_ESTATUS  BIGINT                NOT NULL,
  DESCRIPCION       VARCHAR(10)           NOT NULL,
  RFC_USUARIO       VARCHAR(13)           NOT NULL,
  FECHA             TIMESTAMP(6)                NOT NULL
);

CREATE TABLE CATALOGOS.TC_MATERIAL_APOYO
(
  ID             BIGSERIAL                         NOT NULL PRIMARY KEY,
  ID_SISTEMA     BIGINT                         NOT NULL,
  RUTA_ABSOLUTA  VARCHAR(250)             NOT NULL,
  NOMBRE         VARCHAR(250)             NOT NULL,
  DESCRIPCION    VARCHAR(250)             NOT NULL,
  FECHA          TIMESTAMP(6),
  EXTENSION      VARCHAR(6),
  TIPO           VARCHAR(10)              NOT NULL
);

CREATE TABLE CATALOGOS.TC_NACIONALIDAD
(
  CVE_NACIONALIDAD  BIGSERIAL                      NOT NULL PRIMARY KEY,
  DESCRIPCION       VARCHAR(50)           NOT NULL,
  RFC_USUARIO       VARCHAR(13)           NOT NULL,
  FECHA             TIMESTAMP(6)                NOT NULL
);

CREATE TABLE CATALOGOS.TC_NIVEL_ACADEMICO
(
  CVE_NIVEL_ACADEMICO  BIGSERIAL                   NOT NULL PRIMARY KEY,
  DESCRIPCION          VARCHAR(50)        NOT NULL,
  APLICA               VARCHAR(1)         NOT NULL
);

CREATE TABLE CATALOGOS.TC_NIVEL_PUESTO
(
  CVE_NIVEL_PUESTO  BIGSERIAL            NOT NULL PRIMARY KEY,
  DESCRIPCION       VARCHAR(100)
);

CREATE TABLE CATALOGOS.TC_PAIS
(
  CVE_PAIS      BIGSERIAL                          NOT NULL PRIMARY KEY,
  ABREVIATURA   VARCHAR(2)                NOT NULL,
  DESCRIPCION   VARCHAR(100)              NOT NULL,
  NACIONALIDAD  VARCHAR(100)              NOT NULL,
  RFC_USUARIO   VARCHAR(13)               NOT NULL,
  FECHA         TIMESTAMP(6)                    NOT NULL
);

CREATE TABLE MET.TD_FOLIO_SOLICITUD_TRABAJADOR
(
  ID_RAMO                BIGINT                 NOT NULL,
  ID_UNIDAD_RESPONSABLE  BIGINT                 NOT NULL,
  FOLIO_SOLICITUD        BIGINT                 NOT NULL
);

ALTER TABLE MET.TD_FOLIO_SOLICITUD_TRABAJADOR ADD CONSTRAINT TD_FOL_SOL_TRAB_TC_RAMO_FK1
FOREIGN KEY (ID_RAMO)
REFERENCES CATALOGOS.TC_RAMO (ID_RAMO);

ALTER TABLE MET.TD_FOLIO_SOLICITUD_TRABAJADOR ADD CONSTRAINT TD_FOL_SOL_TRAB_TC_UR_FK2
FOREIGN KEY (ID_UNIDAD_RESPONSABLE)
REFERENCES CATALOGOS.TC_UNIDAD_RESPONSABLE (ID_UNIDAD_RESPONSABLE);

