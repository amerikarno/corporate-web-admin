import reducer, { setSuit, resetSuit } from "@/features/suit/suitSlice";
type SuitTestResult = {
    registerId?: string;
    totalScore?: number;
    level?: number;
    invsetorTypeRisk?: string;
    suitTestResult?: SuitTestResultAnswer;
    type?: number;
  };
  
  type SuitTestResultAnswer = {
    answer: SuitAnswer[];
    additional: Array<boolean | undefined | null>;
  };
  
  type SuitAnswer = {
    id?: string;
    ans: number[] | number;
    type: number;
    quiz: number;
  };

const mockSuitAnswer: SuitAnswer = {
  id: "1",
  ans: [1, 2, 3],
  type: 1,
  quiz: 1,
};

const mockSuitTestResultAnswer: SuitTestResultAnswer = {
  answer: [mockSuitAnswer],
  additional: [true, null, false],
};

const mockSuitTestResult: SuitTestResult = {
  registerId: "ABC123",
  totalScore: 100,
  level: 5,
  invsetorTypeRisk: "High",
  suitTestResult: mockSuitTestResultAnswer,
  type: 2,
};

describe('suitSlice', () => {
  const initialState: SuitTestResult = {};

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSuit', () => {
    const actual = reducer(initialState, setSuit(mockSuitTestResult));
    expect(actual).toEqual(mockSuitTestResult);
  });

  it('should handle resetSuit', () => {
    const stateWithSuit = { ...mockSuitTestResult };
    const actual = reducer(stateWithSuit, resetSuit());
    expect(actual).toEqual(initialState);
  });
});