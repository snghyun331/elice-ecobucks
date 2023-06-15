import { seoulUsageService, districtUsageService, seasonalUsageService } from "../services/data-service.js";

const getSeoulUsage = (req, res, next) => {
  seoulUsageService()
    .then(documents => {
      res.json(documents); // 조회한 데이터를 JSON으로 응답
    })
    .catch(err => {
      console.error('서울시 데이터 조회에 실패했습니다:', err);
      next(err);
    });
};

const getDistrictUsage = (req, res, next) => {
    districtUsageService()
      .then(documents => {
        res.json(documents); // 조회한 데이터를 JSON으로 응답
      })
      .catch(err => {
        console.error('자치구 데이터 조회에 실패했습니다:', err);
        next(err);
      });
};

const getSeasonalUsage = (req, res, next) => {
    seasonalUsageService()
      .then(documents => {
        res.json(documents); // 조회한 데이터를 JSON으로 응답
      })
      .catch(err => {
        console.error('계절별 데이터 조회에 실패했습니다:', err);
        next(err);
      });
};

export { getSeoulUsage, getDistrictUsage, getSeasonalUsage };