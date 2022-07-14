# 목차

- [목차](#목차)
  - [useGetUserStateFromLocalStorage](#usegetuserstatefromlocalstorage)
    - [API](#api)
    - [예제](#예제)
  - [useImageUpload](#useimageupload)
    - [API](#api-1)
    - [예제](#예제-1)
  - [useModalHook](#usemodalhook)
    - [예제](#예제-2)
  - [useRemoveUserInfoInLocalStorage](#useremoveuserinfoinlocalstorage)
  - [useSetUser](#usesetuser)
    - [API](#api-2)
- [유틸 함수](#유틸-함수)
  - [calculatePrice](#calculateprice)
  - [handleErrorMessage](#handleerrormessage)
  - [translateLocalCurrency](#translatelocalcurrency)
  - [translateOrderStateFromEngToKo](#translateorderstatefromengtoko)

## useGetUserStateFromLocalStorage

로컬 스토리지에 저장된 사용자 정보의 유무를 비교하여 자동 로그인을 유지시킵니다.

### API

| Property |           Description            |   Type    | Default |
| :------: | :------------------------------: | :-------: | :-----: |
| getUser  | user 정보를 담고있는 객체입니다. | UserState |         |

### 예제

```typescript
const Example = () => {
  const { getUser } = useGetUserStateFromLocalStorage();
  const setUser = useSetRecoilState(userState)

  useEffect(()=>{
    if(getUser){
        setUser(getUser)
    }
  },[getUser])

  return ...
};
```

## useImageUpload

아마존 S3에 사진을 업로드 합니다.

### API

|  Property  |                         Description                          |                          Type                           | Default |
| :--------: | :----------------------------------------------------------: | :-----------------------------------------------------: | :-----: |
| uploadFile |   input 태그의 change event를 파라미터로 받는 함수입니다.    | (e: React.ChangeEvent<HTMLInputElement>)=>Promise<void> |         |
|  location  |      아마존 S3에 업로드 된 사진의 위치를 담고있습니다.       |                         string                          |   ""    |
|   error    | 아마존 S3 업로드 실패시 발생하는 에러 메시지를 담고있습니다. |                         string                          |   ""    |

### 예제

```typescript
const Example = () => {
  const [image, setImage] = useState("");
  const { error, location, uploadFile } = useImageUpload();

  useEffect(() => {
    if (location) {
      setImage(location);
    }
  }, [location]);

  return (
    <>
      <input
        id="imageUploader"
        type="file"
        accept="image/*"
        name="imageUrl"
        onChange={uploadFile}
      />
      {error && <p>{error}</p>}
    </>
  );
};
```

## useModalHook

모달을 제어합니다.

|   Property   |                   Description                    |                           Type                           | Default |
| :----------: | :----------------------------------------------: | :------------------------------------------------------: | :-----: |
|      id      | 제어 하고자 하는 아이템의 아이디를 담고있습니다. |                          string                          |  null   |
|    setId     |           id를 제어 할 때 사용합니다.            | React.Dispatch<React.SetStateAction<string &#166; null>> |  null   |
|   isModal    |          모달창을 제어할 때 사용합니다.          |                         boolean                          |  false  |
|  setIsModal  |         isModal을 제어 할 때 사용합니다.         |      React.Dispatch<React.SetStateAction\<boolean>>      |         |
|   confirm    |    모달창의 확인 버튼을 제어할때 사용합니다.     |                          false                           |  false  |
| setIsConfirm |         confirm을 제어 할 때 사용합니다.         |      React.Dispatch<React.SetStateAction\<boolean>>      |         |

### 예제

토글 버튼을 제어하는 예제입니다. 토글 버튼을 누르면 모달창을 열고 모달 컴포넌트에서 setConfirm으로 confirm을 제어하여 토글 버튼을 동작시킵니다.

```typescript
const Example = (storeId: string) => {
  const { id, setId, isModal, setIsModal, confirm, setConfirm } =
    useModalHook();

  useEffect(() => {
    if (storeId) {
      setId(storeId);
    }
  }, []);

  useEffect(() => {
    if (confirm) {
      toggleStoreAvailableMutate({ id: Number(id) });
      setConfirm(false);
    }
  }, [confirm]);

  return (
    <>
      {isModal && (
        <Modal>
          <IsOpenModalChildren setModal={setIsModal} setConfirm={setConfirm} />
        </Modal>
      )}
      <ToggleButton
        size={5}
        isActive={store.isAvailable}
        onClick={() => setIsModal(true)}
      />
    </>
  );
};
```

## useRemoveUserInfoInLocalStorage

로컬 스토리지에 저장된 아이템의 key값을 찾아 제거합니다.

|   Property   |                   Description                    |                           Type                           | Default |
| :----------: | :----------------------------------------------: | :------------------------------------------------------: | :-----: |
|      id      | 제어 하고자 하는 아이템의 아이디를 담고있습니다. |                          string                          |  null   |
|    setId     |           id를 제어 할 때 사용합니다.            | React.Dispatch<React.SetStateAction<string &#166; null>> |  null   |
|   isModal    |          모달창을 제어할 때 사용합니다.          |                         boolean                          |  false  |
|  setIsModal  |         isModal을 제어 할 때 사용합니다.         |      React.Dispatch<React.SetStateAction\<boolean>>      |         |
|   confirm    |    모달창의 확인 버튼을 제어할때 사용합니다.     |                          false                           |  false  |
| setIsConfirm |         confirm을 제어 할 때 사용합니다.         |      React.Dispatch<React.SetStateAction\<boolean>>      |         |

## useSetUser

로그인시 user 정보를 로컬 스토리지에 저장합니다.

### API

| Property |               Description               |           Type            | Default |
| :------: | :-------------------------------------: | :-----------------------: | :-----: |
| setUser  | 유저 정보를 파라미터로 받는 함수입니다. | (user: UserState) => void |         |

# 유틸 함수

## calculatePrice

고객이 주문한 상품의 amount와 price를 받아 총 가격을 계산합니다.

```typescript
(price?: ProductInfo["productPrice"], amount?: ProductInfo["amount"]) =>
  string | undefined;
```

## handleErrorMessage

error와 setError를 파라미터로 받아 error를 객체 형태로 전환합니다.

```typescript
<T>(error: Error, setErrorState: React.Dispatch<React.SetStateAction<T>>) => void
```

## translateLocalCurrency

상품 정보에서 price를 받아 지역 화폐 단위로 전환해 줍니다.

```typescript
(price: number, locales?: any, options?: any) => string;
```

## translateOrderStateFromEngToKo

영문화 되어있는 주문 정보를 국문으로 전환해줍니다.

```typescript
(state: OrderStatusType) => "접수" | "취소" | "완료" | undefined;
```
